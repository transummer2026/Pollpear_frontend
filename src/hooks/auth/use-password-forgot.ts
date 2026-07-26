import { type PasswordForgotDTO } from "@shared/schemas/auth.schema";
import { ApiError, postJson } from "@/lib/fetcher";
import useSWRMutation from "swr/mutation";
import type { UserDTO } from "@shared/schemas/users.schema";

/**
 *
 * @note: useSWRMutation <what we get, errors, trigger, what we send>
 */
export function usePasswordForgot() {
  return useSWRMutation<UserDTO, ApiError, string, PasswordForgotDTO>(
    "/auth/password-forgot",
    (resource, { arg }) => postJson<UserDTO>(resource, arg),
  );
}
