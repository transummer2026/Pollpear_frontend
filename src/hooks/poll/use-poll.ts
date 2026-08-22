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

export type PollResultsDTO = {
  totalVotes: number;
  options: (PollReadDTO["options"][number] & { votes: number })[];
};

export function usePoll(pollId?: number) {
  return useSWR<PollReadDTO, ApiError>(
    pollId ? `/polls/${pollId}` : null,
    fetcher,
  );
}

export function usePolls() {
  return useSWR<PollReadDTO[], ApiError>("/polls", fetcher);
}

export function usePollsUser(userId?: number) {
  return useSWR<PollReadDTO[], ApiError>(
    userId
      ? `/polls?${new URLSearchParams({ userId: userId.toString() })}`
      : null,
    fetcher,
  );
}

export function usePollResults(pollId?: number, enabled = true) {
  return useSWR<PollResultsDTO, ApiError>(
    pollId && enabled ? `/polls/${pollId}/results` : null,
    fetcher,
  );
}

export function usePollCreate() {
  return useSWRMutation<PollCreateDTO, ApiError, string, PollCreateDTO>(
    "/polls/new",
    (resource, { arg }) => postJson<PollCreateDTO>(resource, arg),
  );
}

export function usePollUpdate(pollId: number) {
  return useSWRMutation<PollUpdateDTO, ApiError, string, PollUpdateDTO>(
    `/polls/${pollId}`,
    (resource, { arg }) => patchJson<PollUpdateDTO>(resource, arg),
  );
}

export function useVotePoll(pollId: number) {
  return useSWRMutation<VoteCreateDTO, ApiError, string, VoteCreateDTO>(
    `/polls/${pollId}/vote`,
    (resource, { arg }) => postJson<VoteCreateDTO>(resource, arg),
  );
}

export function useVotePollUpdate(pollId: number) {
  return useSWRMutation<VoteCreateDTO, ApiError, string, VoteCreateDTO>(
    `/polls/${pollId}/vote`,
    (resource, { arg }) => patchJson<VoteCreateDTO>(resource, arg),
  );
}

export function usePollDelete(pollId: number) {
  return useSWRMutation<VoteCreateDTO, ApiError, string>(
    `/polls/${pollId}`,
    (ressource) => deleteJson<VoteCreateDTO>(ressource),
  );
}
