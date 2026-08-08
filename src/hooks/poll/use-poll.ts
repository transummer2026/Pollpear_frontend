import { z } from "zod";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { fetcher, postJson, type ApiError } from "@/lib/fetcher";
import type { PollType } from "@shared/prisma/schemas/enums/PollType.schema";
import type { PollStatus } from "@shared/prisma/schemas/enums/PollStatus.schema";
import { VoteCreationSchema } from "@shared/schemas/vote.schema";

export type VoteCreationInput = z.infer<typeof VoteCreationSchema>;

/**
 * Shape we expect from the read routes. They are not implemented yet
 * (the backend answers 503 and the gateway does not even proxy them), so this
 * is the contract to line up with once they are, not something observed.
 * Dates are strings here: they went through JSON.
 */
export type PollOptionDTO = {
  id: number;
  label: string;
  order: number;
};

export type PollDetailDTO = {
  id: number;
  title: string;
  description?: string | null;
  type: PollType;
  status: PollStatus;
  createdAt: string;
  endsAt: string;
  allowChangeVote: boolean;
  isAnonymous: boolean;
  options: PollOptionDTO[];
  hashtags?: { name: string }[];
  /** ids the current user already voted for, empty or absent if they did not */
  myVote?: { optionIds: number[] } | null;
};

export type PollResultsDTO = {
  totalVotes: number;
  options: (PollOptionDTO & { votes: number })[];
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
  return useSWRMutation<unknown, ApiError, string, VoteCreationInput>(
    `/polls/${pollId}/vote`,
    (resource, { arg }) => postJson<unknown>(resource, arg),
  );
}
