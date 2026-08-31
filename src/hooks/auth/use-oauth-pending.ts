import { type OauthPendingDTO } from "@shared/schemas/oauth.schema";
import { ApiError, fetcher } from "@/lib/fetcher";
import useSWR from "swr";

/**
 * The profile a provider handed back, held server-side between the redirect and
 * the end of signup. Prefills the form the user still has to complete. The key
 * is `null` without a token so nothing is requested, and the session is
 * short-lived: a failure means it expired, not that the app is broken, hence no
 * retry.
 */
export function useOAuthPending(token: string | null) {
  return useSWR<OauthPendingDTO, ApiError>(
    token ? `/auth/oauth/pending?token=${encodeURIComponent(token)}` : null,
    fetcher,
    { shouldRetryOnError: false, revalidateOnFocus: false },
  );
}
