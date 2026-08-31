import { type LoginDTO } from "@shared/schemas/auth.schema";
import { ApiError, postJson } from "@/lib/fetcher";
import useSWRMutation from "swr/mutation";
import type { UserDTO } from "@shared/schemas/users.schema";

/**
 * Opens a session. The gateway sets the session cookie on the response itself
 * and answers with the user, so there is no token to keep around here.
 */
export function useLogin() {
  return useSWRMutation<UserDTO, ApiError, string, LoginDTO>(
    "/auth/login",
    (resource, { arg }) => postJson<UserDTO>(resource, arg),
  );
}
