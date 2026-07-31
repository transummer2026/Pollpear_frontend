import { type PollCreationDTO } from "@shared/schemas/polls.schema";
import { ApiError, postJson } from "@/lib/fetcher";
import useSWRMutation from "swr/mutation";

export function useCreatePoll() {
  return useSWRMutation<unknown, ApiError, string, PollCreationDTO>(
    "/polls/new",
    (resource, { arg }) => postJson<unknown>(resource, arg),
  );
}
