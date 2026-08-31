import { type PasswordForgotDTO } from "@shared/schemas/auth.schema";
import { ApiError, postJson } from "@/lib/fetcher";
import useSWRMutation from "swr/mutation";

/**
 * Starts a password reset by mailing a one-time link. Always resolves, even for
 * an unknown address: the answer must not tell a stranger whether an account
 * exists.
 */
export function usePasswordForgot() {
  return useSWRMutation<void, ApiError, string, PasswordForgotDTO>(
    "/auth/password-forgot",
    (resource, { arg }) => postJson<void>(resource, arg),
  );
}
