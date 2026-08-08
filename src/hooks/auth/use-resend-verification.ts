import { type ResendVerificationDTO } from "@shared/schemas/auth.schema";
import { ApiError, postJson } from "@/lib/fetcher";
import useSWRMutation from "swr/mutation";

export function useResendVerification() {
  return useSWRMutation<void, ApiError, string, ResendVerificationDTO>(
    "/auth/verify-email/resend",
    (resource, { arg }) => postJson<void>(resource, arg),
  );
}
