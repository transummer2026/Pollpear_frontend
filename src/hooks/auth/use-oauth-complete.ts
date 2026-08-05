import { type OauthCompleteSchemaDTO } from "@shared/schemas/auth.schema";
import { ApiError, postJson } from "@/lib/fetcher";
import useSWRMutation from "swr/mutation";
import type { UserDTO } from "@shared/schemas/users.schema";

export function useOAuthComplete() {
  return useSWRMutation<UserDTO, ApiError, string, OauthCompleteSchemaDTO>(
    "/auth/oauth/complete",
    (resource, { arg }) => postJson<UserDTO>(resource, arg),
  );
}
