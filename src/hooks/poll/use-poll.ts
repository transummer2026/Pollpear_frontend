import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import {
  fetcher,
  patchJson,
  postJson,
  deleteJson,
  type ApiError,
} from "@/lib/fetcher";
import type { VoteCreateDTO } from "@shared/schemas/vote.schema";
import type {
  PollCreateDTO,
  PollReadDTO,
  PollUpdateDTO,
} from "@shared/schemas/polls.schema";

/**
 * Shape of `/polls/:id/results`: the poll's options, each carrying its tally,
 * plus the total to divide by. Computed server-side so a client can never
 * disagree with another about the same poll.
 */
export type PollResultsDTO = {
  totalVotes: number;
  options: (PollReadDTO["options"][number] & { votes: number })[];
};

/** The signed-in user's own polls, whatever their visibility. */
export function usePolls() {
  return useSWR<PollReadDTO[], ApiError>("/polls", fetcher);
}

/**
 * The ranked feed: polls the recommender picked for this user, in the order it
 * returned them. `limit` is a request, not a guarantee — the backend caps it.
 * The route answers 503 when the recommender is down, which FeedContent renders
 * as a degraded section rather than letting it take the page down.
 */
export function usePollsFeed(limit: number) {
  return useSWR<PollReadDTO[], ApiError>(`/feed?limit=${limit}`, fetcher);
}

/**
 * Every poll the current user has voted on, most recent vote first. Plain
 * filter on `/polls`, no recommender involved.
 */
export function useVotedPolls() {
  return useSWR<PollReadDTO[], ApiError>("/polls?voted=true", fetcher);
}

/**
 * Someone else's polls, filtered by the backend to what the viewer may see —
 * anonymous ones are left out entirely, so this is never the same list as the
 * author's own `/polls`.
 */
export function usePollsUser(userId?: number) {
  return useSWR<PollReadDTO[], ApiError>(
    userId
      ? `/polls?${new URLSearchParams({ userId: userId.toString() })}`
      : null,
    fetcher,
  );
}

/**
 * Tallies for one poll. `enabled` lets a card mount the hook unconditionally
 * and still hold the request back — results are hidden until the viewer has
 * voted, or the poll has closed.
 */
export function usePollResults(pollId?: number, enabled = true) {
  return useSWR<PollResultsDTO, ApiError>(
    pollId && enabled ? `/polls/${pollId}/results` : null,
    fetcher,
  );
}

/**
 * Creates a poll. The status is the backend's to decide — the create schema
 * carries no status field, so the client never proposes one.
 */
export function usePollCreate() {
  return useSWRMutation<PollCreateDTO, ApiError, string, PollCreateDTO>(
    "/polls/new",
    (resource, { arg }) => postJson<PollCreateDTO>(resource, arg),
  );
}

/**
 * Reshapes a poll. The UI only offers it while the poll is still pending (see
 * isPollEditable); the backend has the final say.
 */
export function usePollUpdate(pollId: number) {
  return useSWRMutation<PollUpdateDTO, ApiError, string, PollUpdateDTO>(
    `/polls/${pollId}`,
    (resource, { arg }) => patchJson<PollUpdateDTO>(resource, arg),
  );
}

/**
 * Casts a first vote. Voting again on the same poll is an update, not a second
 * vote (useVotePollUpdate) — one voter, one answer.
 */
export function useVotePoll(pollId: number) {
  return useSWRMutation<VoteCreateDTO, ApiError, string, VoteCreateDTO>(
    `/polls/${pollId}/vote`,
    (resource, { arg }) => postJson<VoteCreateDTO>(resource, arg),
  );
}

/** Changes a vote already cast, as long as the poll is still open. */
export function useVotePollUpdate(pollId: number) {
  return useSWRMutation<VoteCreateDTO, ApiError, string, VoteCreateDTO>(
    `/polls/${pollId}/vote`,
    (resource, { arg }) => patchJson<VoteCreateDTO>(resource, arg),
  );
}

/** Deletes a poll, along with the votes attached to it. */
export function usePollDelete(pollId: number) {
  return useSWRMutation<VoteCreateDTO, ApiError, string>(
    `/polls/${pollId}`,
    (ressource) => deleteJson<VoteCreateDTO>(ressource),
  );
}
