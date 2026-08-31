import { createContext, useContext } from "react";
import type { ChatMessage } from "@/hooks/room/chat-reducer";

type RoomChatContextValue = {
  messages: ChatMessage[];
  hasMore: boolean;
  isLoading: boolean;
  isSending: boolean;
  loadOlder: () => Promise<boolean>;
  send: (content: string) => Promise<boolean>;
};

export const RoomChatContext = createContext<RoomChatContextValue | null>(null);

/**
 * Reads the room chat. Throws outside a provider rather than handing back a
 * null context: every consumer would otherwise have to narrow it, when the real
 * answer is that the component was mounted in the wrong place.
 */
export function useRoomChat() {
  const context = useContext(RoomChatContext);
  if (!context) {
    throw new Error("useRoomChat must be used within a <RoomChatProvider>");
  }
  return context;
}
