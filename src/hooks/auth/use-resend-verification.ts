import { type ResendVerificationDTO } from "@shared/schemas/auth.schema";
import { ApiError, postJson } from "@/lib/fetcher";
import useSWRMutation from "swr/mutation";

/**
 * Mails a fresh verification link, for the account matching the given address.
 * The way back in when the first link expired or never arrived.
 */
export function useResendVerification() {
  return useSWRMutation<void, ApiError, string, ResendVerificationDTO>(
    "/auth/verify-email/resend",
    (resource, { arg }) => postJson<void>(resource, arg),
  );
}
