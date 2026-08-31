import { type RegisterDTO } from "@shared/schemas/auth.schema";
import { ApiError, postJson } from "@/lib/fetcher";
import useSWRMutation from "swr/mutation";

/**
 * Creates the account without opening a session: the backend mails a
 * verification link, and the user signs in only once they have followed it.
 */
export function useRegister() {
  return useSWRMutation<RegisterDTO, ApiError, string, RegisterDTO>(
    "/auth/register",
    (resource, { arg }) => postJson<RegisterDTO>(resource, arg),
  );
}
