import { type PasswordResetDTO } from "@shared/schemas/auth.schema";
import { ApiError, postJson } from "@/lib/fetcher";
import useSWRMutation from "swr/mutation";
import type { UserDTO } from "@shared/schemas/users.schema";

/**
 * 
 * @note: useSWRMutation <what we get, errors, trigger, what we send> 
 */
export function usePasswordReset() {
  return useSWRMutation<UserDTO, ApiError, string, PasswordResetDTO>( 
    "/auth/password-reset",
    (resource, { arg }) => postJson<UserDTO>(resource, arg),
  );
}
