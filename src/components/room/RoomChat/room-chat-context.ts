import { createContext, useContext } from "react";
import type { ChatMessage } from "@/hooks/room/chat-reducer";

type RoomChatContextValue = {
  messages: ChatMessage[];
  hasMore: boolean;
  isLoading: boolean;
  isSending: boolean;
  loadOlder: () => void;
  send: (content: string) => void;
};

export const RoomChatContext = createContext<RoomChatContextValue | null>(null);

export function useRoomChat() {
  const context = useContext(RoomChatContext);
  if (!context) {
    throw new Error("useRoomChat must be used within a <RoomChatProvider>");
  }
  return context;
}
