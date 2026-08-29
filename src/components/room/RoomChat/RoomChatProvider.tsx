import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import type { ReactNode } from "react";
import { toast } from "sonner";
import {
  MESSAGE_PAGE_MAX,
  MESSAGE_PAGE_SIZE,
  type MessageReadDTO,
} from "@shared/schemas/messages.schema";
import { ApiError, fetcher } from "@/lib/fetcher";
import { getSocket } from "@/lib/socket";
import { useAuth } from "@/hooks/auth/use-auth";
import {
  chatReducer,
  initialChatState,
  type ChatMessage,
} from "@/hooks/room/chat-reducer";
import { RoomChatContext } from "@/components/room/RoomChat/room-chat-context";

const SEND_TIMEOUT_MS = 5000;
const CATCHUP_MAX_PAGES = 20;

type RoomChatProviderProps = {
  roomId?: number;
  children: ReactNode;
};

export function RoomChatProvider({ roomId, children }: RoomChatProviderProps) {
  const { data: me, isAuthenticated } = useAuth();
  const [state, dispatch] = useReducer(chatReducer, initialChatState);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const newestIdRef = useRef<number | null>(null);
  const draftSeqRef = useRef(0);

  useEffect(() => {
    newestIdRef.current = state.newestId;
  }, [state.newestId]);

  useEffect(() => {
    if (!roomId || !isAuthenticated) return;
    let cancelled = false;

    fetcher<MessageReadDTO[]>(
      `/rooms/${roomId}/messages?limit=${MESSAGE_PAGE_SIZE}`,
    )
      .then((messages) => {
        if (cancelled) return;
        dispatch({
          type: "history",
          messages,
          hasMore: messages.length === MESSAGE_PAGE_SIZE,
        });
      })
      .catch((cause) => {
        if (cancelled) return;
        toast.error(
          cause instanceof ApiError ? cause.message : "Could not load the chat",
        );
      })
      .finally(() => !cancelled && setIsLoading(false));

    return () => {
      cancelled = true;
    };
  }, [roomId, isAuthenticated, reloadKey]);

  useEffect(() => {
    if (!roomId || !isAuthenticated) return;
    const socket = getSocket();

    const onIncoming = (message: MessageReadDTO) => {
      if (message.roomId !== roomId) return;
      dispatch({ type: "incoming", message });
    };

    const catchUp = async (from: number) => {
      let cursor = from;
      for (let page = 0; page < CATCHUP_MAX_PAGES; page++) {
        const messages = await fetcher<MessageReadDTO[]>(
          `/rooms/${roomId}/messages?after=${cursor}&limit=${MESSAGE_PAGE_MAX}`,
        );
        if (messages.length === 0) return;
        dispatch({ type: "catchup", messages });
        if (messages.length < MESSAGE_PAGE_MAX) return;
        cursor = messages[messages.length - 1].id;
      }
      setReloadKey((key) => key + 1);
    };

    const onConnect = () => {
      socket.emit("room:join", { roomId });
      const newestId = newestIdRef.current;
      if (newestId === null) {
        setReloadKey((key) => key + 1);
        return;
      }
      catchUp(newestId).catch(() =>
        toast.error("Could not catch up on missed messages"),
      );
    };

    if (socket.connected) socket.emit("room:join", { roomId });
    socket.on("connect", onConnect);
    socket.on("message:new", onIncoming);

    return () => {
      socket.off("connect", onConnect);
      socket.off("message:new", onIncoming);
      if (socket.connected) socket.emit("room:leave", { roomId });
    };
  }, [roomId, isAuthenticated]);

  const loadOlder = useCallback(async () => {
    if (!roomId || !state.hasMore || isLoading || state.oldestId === null)
      return false;
    setIsLoading(true);
    try {
      const messages = await fetcher<MessageReadDTO[]>(
        `/rooms/${roomId}/messages?before=${state.oldestId}&limit=${MESSAGE_PAGE_SIZE}`,
      );
      dispatch({
        type: "history",
        messages,
        hasMore: messages.length === MESSAGE_PAGE_SIZE,
      });
      return messages.length > 0;
    } catch {
      toast.error("Could not load older messages");
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [roomId, state.hasMore, state.oldestId, isLoading]);

  const send = useCallback(
    (content: string) => {
      const trimmed = content.trim();
      if (!roomId || !me || trimmed.length === 0) return Promise.resolve(false);

      const seq = ++draftSeqRef.current;
      const tempId = `temp-${seq}`;
      const optimistic: ChatMessage = {
        tempId,
        id: -seq,
        roomId,
        authorId: me.id,
        content: trimmed,
        createdAt: new Date(),
        author: me as ChatMessage["author"],
      };

      dispatch({ type: "sending", message: optimistic });
      setIsSending(true);

      return new Promise<boolean>((resolve) => {
        getSocket()
          .timeout(SEND_TIMEOUT_MS)
          .emit(
            "message:send",
            { roomId, content: trimmed },
            (cause: unknown, message: MessageReadDTO) => {
              setIsSending(false);
              if (cause) {
                dispatch({ type: "failed", tempId });
                toast.error("Message not sent");
                resolve(false);
                return;
              }
              dispatch({ type: "sent", tempId, message });
              resolve(true);
            },
          );
      });
    },
    [roomId, me],
  );

  return (
    <RoomChatContext.Provider
      value={{
        messages: state.messages,
        hasMore: state.hasMore,
        isLoading,
        isSending,
        loadOlder,
        send,
      }}
    >
      {children}
    </RoomChatContext.Provider>
  );
}
