import type { MessageReadDTO } from "@shared/schemas/messages.schema";

export type ChatMessage = MessageReadDTO & { tempId?: string };

export type ChatState = {
  messages: ChatMessage[];
  oldestId: number | null;
  newestId: number | null;
  hasMore: boolean;
};

export type ChatAction =
  | { type: "history"; messages: MessageReadDTO[]; hasMore: boolean }
  | { type: "catchup"; messages: MessageReadDTO[] }
  | { type: "incoming"; message: MessageReadDTO }
  | { type: "sending"; message: ChatMessage }
  | { type: "sent"; tempId: string; message: MessageReadDTO }
  | { type: "failed"; tempId: string }
  | { type: "reset" };

export const initialChatState: ChatState = {
  messages: [],
  oldestId: null,
  newestId: null,
  hasMore: true,
};

const isPending = (message: ChatMessage) => message.tempId !== undefined;

const rank = (message: ChatMessage) =>
  isPending(message) ? Number.MAX_SAFE_INTEGER : message.id;

function normalize(messages: ChatMessage[]): ChatMessage[] {
  const seen = new Set<number>();
  const unique = messages.filter((message) => {
    if (isPending(message)) return true;
    if (seen.has(message.id)) return false;
    seen.add(message.id);
    return true;
  });

  return unique.sort((a, b) => rank(a) - rank(b));
}

function withMessages(
  state: ChatState,
  messages: ChatMessage[],
  hasMore = state.hasMore,
): ChatState {
  const normalized = normalize(messages);
  const settled = normalized.filter((message) => !isPending(message));

  return {
    messages: normalized,
    oldestId: settled.length > 0 ? settled[0].id : null,
    newestId: settled.length > 0 ? settled[settled.length - 1].id : null,
    hasMore,
  };
}

export function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case "history":
      return withMessages(
        state,
        [...action.messages, ...state.messages],
        action.hasMore,
      );
    case "catchup":
      return withMessages(state, [...state.messages, ...action.messages]);
    case "incoming":
    case "sending":
      return withMessages(state, [...state.messages, action.message]);
    case "sent":
      return withMessages(
        state,
        state.messages.map((message) =>
          message.tempId === action.tempId ? action.message : message,
        ),
      );
    case "failed":
      return withMessages(
        state,
        state.messages.filter((message) => message.tempId !== action.tempId),
      );
    case "reset":
      return initialChatState;
    default:
      return state;
  }
}
