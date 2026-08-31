import { type VerifyEmailDTO } from "@shared/schemas/auth.schema";
import { ApiError, postJson } from "@/lib/fetcher";
import useSWR from "swr";

/**
 * Confirms the address behind a verification link. A POST driven by useSWR
 * rather than a mutation, because the page has nothing to submit: it lands with
 * the token in its URL and wants the call fired on mount, with the loading and
 * error states the card renders. Hence the key on the token — `null` while
 * there is none, so nothing is sent — and revalidation on focus turned off, a
 * token being single-use.
 */
export function useVerifyEmail(token: string | null) {
  return useSWR<void, ApiError>(
    token ? `/auth/verify-email?token=${encodeURIComponent(token)}` : null,
    () => postJson<void>("/auth/verify-email", { token } as VerifyEmailDTO),
    { shouldRetryOnError: false, revalidateOnFocus: false },
  );
}
