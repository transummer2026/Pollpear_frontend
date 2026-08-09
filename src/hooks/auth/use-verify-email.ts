import { type VerifyEmailDTO } from "@shared/schemas/auth.schema";
import { ApiError, postJson } from "@/lib/fetcher";
import useSWR from "swr";

export function useVerifyEmail(token: string | null) {
  return useSWR<void, ApiError>(
    token ? `/auth/verify-email?token=${encodeURIComponent(token)}` : null,
    () => postJson<void>("/auth/verify-email", { token } as VerifyEmailDTO),
    { shouldRetryOnError: false, revalidateOnFocus: false },
  );
}
