import { describe, expect, it } from "vitest";
import type { MessageReadDTO } from "@shared/schemas/messages.schema";
import {
  chatReducer,
  initialChatState,
  type ChatMessage,
  type ChatState,
} from "./chat-reducer";

function message(id: number): MessageReadDTO {
  return {
    id,
    roomId: 1,
    authorId: 4,
    content: `m${id}`,
    createdAt: new Date("2026-08-29T00:00:00Z"),
    author: null,
  };
}

function pending(seq: number): ChatMessage {
  return { ...message(-seq), tempId: `temp-${seq}` };
}

const ids = (state: ChatState) =>
  state.messages.map((message) => message.tempId ?? message.id);

const loaded = () =>
  chatReducer(initialChatState, {
    type: "history",
    messages: [message(3), message(4)],
    hasMore: true,
  });

describe("chatReducer", () => {
  describe("history", () => {
    it("loads the newest page and sets both cursors", () => {
      const state = loaded();

      expect(ids(state)).toEqual([3, 4]);
      expect(state.oldestId).toBe(3);
      expect(state.newestId).toBe(4);
      expect(state.hasMore).toBe(true);
    });

    it("prepends an older page and moves the oldest cursor back", () => {
      const state = chatReducer(loaded(), {
        type: "history",
        messages: [message(1), message(2)],
        hasMore: false,
      });

      expect(ids(state)).toEqual([1, 2, 3, 4]);
      expect(state.oldestId).toBe(1);
      expect(state.hasMore).toBe(false);
    });
  });

  describe("catchup", () => {
    it("reorders a page that lands after a live message", () => {
      const live = chatReducer(loaded(), {
        type: "incoming",
        message: message(7),
      });

      const state = chatReducer(live, {
        type: "catchup",
        messages: [message(5), message(6)],
      });

      expect(ids(state)).toEqual([3, 4, 5, 6, 7]);
      expect(state.newestId).toBe(7);
    });
  });

  describe("sending", () => {
    it("keeps the pending bubble last despite its negative id", () => {
      const state = chatReducer(loaded(), {
        type: "sending",
        message: pending(1),
      });

      expect(ids(state)).toEqual([3, 4, "temp-1"]);
    });

    it("leaves the cursors on settled messages only", () => {
      const state = chatReducer(loaded(), {
        type: "sending",
        message: pending(1),
      });

      expect(state.oldestId).toBe(3);
      expect(state.newestId).toBe(4);
    });
  });

  describe("sent", () => {
    it("replaces the bubble with the acknowledged message", () => {
      const sending = chatReducer(loaded(), {
        type: "sending",
        message: pending(1),
      });

      const state = chatReducer(sending, {
        type: "sent",
        tempId: "temp-1",
        message: message(5),
      });

      expect(ids(state)).toEqual([3, 4, 5]);
      expect(state.newestId).toBe(5);
    });

    it("converges on one copy when the echo lands after the ack", () => {
      const sending = chatReducer(loaded(), {
        type: "sending",
        message: pending(1),
      });
      const acked = chatReducer(sending, {
        type: "sent",
        tempId: "temp-1",
        message: message(5),
      });

      const state = chatReducer(acked, {
        type: "incoming",
        message: message(5),
      });

      expect(ids(state)).toEqual([3, 4, 5]);
    });

    it("converges on one copy when the echo lands before the ack", () => {
      const sending = chatReducer(loaded(), {
        type: "sending",
        message: pending(1),
      });
      const echoed = chatReducer(sending, {
        type: "incoming",
        message: message(5),
      });
      expect(ids(echoed)).toEqual([3, 4, 5, "temp-1"]);

      const state = chatReducer(echoed, {
        type: "sent",
        tempId: "temp-1",
        message: message(5),
      });

      expect(ids(state)).toEqual([3, 4, 5]);
    });

    it("keeps an acknowledged message whose bubble is already gone", () => {
      const sending = chatReducer(loaded(), {
        type: "sending",
        message: pending(1),
      });
      const timedOut = chatReducer(sending, {
        type: "failed",
        tempId: "temp-1",
      });

      const state = chatReducer(timedOut, {
        type: "sent",
        tempId: "temp-1",
        message: message(5),
      });

      expect(ids(state), "the server stored it, it must not vanish").toEqual([
        3, 4, 5,
      ]);
    });
  });

  describe("catchup", () => {
    it("leaves hasMore untouched: it only speaks about older pages", () => {
      const state = chatReducer(loaded(), {
        type: "catchup",
        messages: [message(5)],
      });

      expect(state.hasMore).toBe(true);
    });
  });

  describe("cursors", () => {
    it("stays without cursor while nothing is settled", () => {
      const empty = chatReducer(initialChatState, {
        type: "history",
        messages: [],
        hasMore: false,
      });
      expect([empty.oldestId, empty.newestId]).toEqual([null, null]);

      const onlyPending = chatReducer(initialChatState, {
        type: "sending",
        message: pending(1),
      });
      expect([onlyPending.oldestId, onlyPending.newestId]).toEqual([
        null,
        null,
      ]);
    });
  });

  describe("failed", () => {
    it("drops the bubble the server never acknowledged", () => {
      const sending = chatReducer(loaded(), {
        type: "sending",
        message: pending(1),
      });

      const state = chatReducer(sending, { type: "failed", tempId: "temp-1" });

      expect(ids(state)).toEqual([3, 4]);
    });
  });

  describe("reset", () => {
    it("goes back to the initial state", () => {
      expect(chatReducer(loaded(), { type: "reset" })).toEqual(
        initialChatState,
      );
    });
  });
});
