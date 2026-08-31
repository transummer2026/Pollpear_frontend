import { type PasswordResetDTO } from "@shared/schemas/auth.schema";
import { ApiError, postJson } from "@/lib/fetcher";
import useSWRMutation from "swr/mutation";

/**
 * Sets the new password for the account behind a reset token. The token is
 * carried in the body, not a session — the user is signed out at this point.
 */
export function usePasswordReset() {
  return useSWRMutation<void, ApiError, string, PasswordResetDTO>(
    "/auth/password-reset",
    (resource, { arg }) => postJson<void>(resource, arg),
  );
}
