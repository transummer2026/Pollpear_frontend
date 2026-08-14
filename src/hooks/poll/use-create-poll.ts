import { type PollCreateDTO } from "@shared/schemas/polls.schema";
import { ApiError, postJson } from "@/lib/fetcher";
import useSWRMutation from "swr/mutation";

export function useCreatePoll() {
  return useSWRMutation<unknown, ApiError, string, PollCreateDTO>(
    "/polls/new",
    (resource, { arg }) => postJson<unknown>(resource, arg),
  );
}
