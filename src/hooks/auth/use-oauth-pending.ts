import { type OauthPendingSchemaDTO } from "@shared/schemas/auth.schema";
import { ApiError, fetcher } from "@/lib/fetcher";
import useSWR from "swr";

export function useOAuthPending(token: string | null) {
  return useSWR<OauthPendingSchemaDTO, ApiError>(
    token ? `/auth/oauth/pending?token=${encodeURIComponent(token)}` : null,
    fetcher,
    { shouldRetryOnError: false, revalidateOnFocus: false },
  );
}
