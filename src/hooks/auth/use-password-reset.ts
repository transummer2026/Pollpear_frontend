import { type PasswordResetDTO } from "@shared/schemas/auth.schema";
import { ApiError, postJson } from "@/lib/fetcher";
import useSWRMutation from "swr/mutation";

/**
 *
 * @note: useSWRMutation <what we get, errors, trigger, what we send>
 */
export function usePasswordReset() {
  return useSWRMutation<void, ApiError, string, PasswordResetDTO>(
    "/auth/password-reset",
    (resource, { arg }) => postJson<void>(resource, arg),
  );
}
