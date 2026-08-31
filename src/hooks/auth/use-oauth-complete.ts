import { type OauthCompleteDTO } from "@shared/schemas/oauth.schema";
import { ApiError, postJson } from "@/lib/fetcher";
import useSWRMutation from "swr/mutation";
import type { UserDTO } from "@shared/schemas/users.schema";

/**
 * Turns a pending OAuth signup into a real account, once the user filled in
 * what the provider did not give. Answers with the created user and opens the
 * session, so callers seed the `/me` cache with it instead of refetching.
 */
export function useOAuthComplete() {
  return useSWRMutation<UserDTO, ApiError, string, OauthCompleteDTO>(
    "/auth/oauth/complete",
    (resource, { arg }) => postJson<UserDTO>(resource, arg),
  );
}
