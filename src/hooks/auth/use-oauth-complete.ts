import { type OauthCompleteDTO } from "@shared/schemas/oauth.schema";
import { ApiError, postJson } from "@/lib/fetcher";
import useSWRMutation from "swr/mutation";
import type { UserDTO } from "@shared/schemas/users.schema";

export function useOAuthComplete() {
  return useSWRMutation<UserDTO, ApiError, string, OauthCompleteDTO>(
    "/auth/oauth/complete",
    (resource, { arg }) => postJson<UserDTO>(resource, arg),
  );
}
