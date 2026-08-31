import { ApiError, putJson } from "@/lib/fetcher";
import useSWRMutation from "swr/mutation";
import type { UserDTO } from "@shared/schemas/users.schema";
import type { UserChangePasswordDTO } from "@shared/schemas/auth.schema";

/**
 * Changes the signed-in user's password. Their current one is part of the body:
 * holding the session is not enough to replace it.
 */
export function usePasswordChange() {
  return useSWRMutation<UserDTO, ApiError, string, UserChangePasswordDTO>(
    "/me/settings/security",
    (resource, { arg }) => putJson<UserDTO>(resource, arg),
  );
}
