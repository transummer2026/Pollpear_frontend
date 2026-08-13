import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { fetcher, postJson, type ApiError } from "@/lib/fetcher";
import type { VoteCreateDTO } from "@shared/schemas/vote.schema";
import type { PollReadDTO } from "@shared/schemas/polls.schema";

/**
 * Shape we expect from the read routes. They are not implemented yet
 * (the backend answers 503 and the gateway does not even proxy them), so this
 * is the contract to line up with once they are, not something observed.
 * Derived from PollReadDTO; its top-level date fields are re-typed as strings
 * since dates go through JSON as ISO strings, and myVote is added on top
 * since it's per-requesting-user state, not part of the Poll model itself.
 */
export type PollDetailDTO = Omit<
  PollReadDTO,
  "publishedAt" | "endsAt" | "createdAt" | "updatedAt" | "deletedAt"
> & {
  publishedAt: string | null;
  endsAt: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  /** ids the current user already voted for, empty or absent if they did not */
  myVote?: { optionIds: number[] } | null;
};

export type PollResultsDTO = {
  totalVotes: number;
  options: (PollDetailDTO["options"][number] & { votes: number })[];
};

export function usePoll(pollId?: number) {
  return useSWR<PollDetailDTO, ApiError>(
    pollId ? `/polls/${pollId}` : null,
    fetcher,
  );
}

/**
 * `enabled` lets a caller hold the request back until the vote is cast, so the
 * results are only fetched once they are meant to be shown.
 */
export function usePollResults(pollId?: number, enabled = true) {
  return useSWR<PollResultsDTO, ApiError>(
    pollId && enabled ? `/polls/${pollId}/results` : null,
    fetcher,
  );
}

export function useVotePoll(pollId: number) {
  return useSWRMutation<unknown, ApiError, string, VoteCreateDTO>(
    `/polls/${pollId}/vote`,
    (resource, { arg }) => postJson<unknown>(resource, arg),
  );
}
