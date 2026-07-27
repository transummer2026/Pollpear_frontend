import { type PasswordForgotDTO } from "@shared/schemas/auth.schema";
import { ApiError, postJson } from "@/lib/fetcher";
import useSWRMutation from "swr/mutation";

/**
 *
 * @note: useSWRMutation <what we get, errors, trigger, what we send>
 */
export function usePasswordForgot() {
  return useSWRMutation<void, ApiError, string, PasswordForgotDTO>(
    "/auth/password-forgot",
    (resource, { arg }) => postJson<void>(resource, arg),
  );
}
