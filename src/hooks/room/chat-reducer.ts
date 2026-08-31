/**
 * State of one room's chat. It is a reducer rather than a handful of useStates
 * because messages reach it from three directions at once — the history page
 * being scrolled into, the socket pushing new ones, and the user's own sends
 * appearing before the server has confirmed them — and every one of those has
 * to leave the list sorted, free of duplicates, and with usable paging cursors.
 */
import type { MessageReadDTO } from "@shared/schemas/messages.schema";

/** A message, plus the local id an optimistic one carries until it is saved. */
export type ChatMessage = MessageReadDTO & { tempId?: string };

/** `oldestId` and `newestId` are the cursors the history and catch-up requests page from. */
export type ChatState = {
  messages: ChatMessage[];
  oldestId: number | null;
  newestId: number | null;
  hasMore: boolean;
};

/**
 * - `history`: an older page, prepended, from scrolling up
 * - `catchup`: what was missed while the socket was down, appended
 * - `incoming`: a message pushed by the socket
 * - `sending` / `sent` / `failed`: the optimistic lifecycle of the user's own
 * - `reset`: leaving the room, or switching to another one
 */
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

// Ids are the chronological order, but a message being sent has none yet — it
// is the most recent thing on screen by definition, so it sorts last.
const rank = (message: ChatMessage) =>
  isPending(message) ? Number.MAX_SAFE_INTEGER : message.id;

/**
 * Sorted, without duplicates. The same message legitimately arrives twice — the
 * socket pushes it while a catch-up request was already carrying it. Only
 * settled ones are deduplicated: an optimistic copy holds a placeholder id that
 * no server row can ever match.
 */
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

/**
 * Rebuilds the state around a new set of messages, recomputing the cursors from
 * the settled ones only: paging from a message the server has never seen would
 * ask for everything after an id that does not exist.
 */
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

/** Every path into the message list goes through here. */
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
    // The optimistic copy is normally still there to be swapped, but a send
    // that timed out has already been dropped as failed; its confirmation can
    // still arrive afterwards, and the message did reach the server, so it is
    // appended instead. normalize() takes care of the duplicate if the
    // broadcast brought it in first.
    case "sent": {
      const pending = state.messages.some(
        (message) => message.tempId === action.tempId,
      );

      return withMessages(
        state,
        pending
          ? state.messages.map((message) =>
              message.tempId === action.tempId ? action.message : message,
            )
          : [...state.messages, action.message],
      );
    }
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
