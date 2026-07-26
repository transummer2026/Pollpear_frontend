import { ApiError, putJson } from "@/lib/fetcher";
import useSWRMutation from "swr/mutation";
import type { UserDTO } from "@shared/schemas/users.schema";
import type { UserChangePasswordDTO } from "@shared/schemas/auth.schema";

/**
 *
 * @note: useSWRMutation <what we get, errors, trigger, what we send>
 */
export function usePasswordChange() {
  return useSWRMutation<UserDTO, ApiError, string, UserChangePasswordDTO>(
    "/me/settings/security",
    (resource, { arg }) => putJson<UserDTO>(resource, arg),
  );
}