import { type OauthPendingDTO } from "@shared/schemas/oauth.schema";
import { ApiError, fetcher } from "@/lib/fetcher";
import useSWR from "swr";

export function useOAuthPending(token: string | null) {
  return useSWR<OauthPendingDTO, ApiError>(
    token ? `/auth/oauth/pending?token=${encodeURIComponent(token)}` : null,
    fetcher,
    { shouldRetryOnError: false, revalidateOnFocus: false },
  );
}
