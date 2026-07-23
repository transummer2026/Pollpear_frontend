import { type LoginDTO } from "@shared/schemas/auth.schema";
import { ApiError, postJson } from "@/lib/fetcher";
import useSWRMutation from "swr/mutation";
import type { UserDTO } from "@shared/schemas/users.schema";

export function useLogin() {
  return useSWRMutation<UserDTO, ApiError, string, LoginDTO>(
    "/auth/login",
    (resource, { arg }) => postJson<UserDTO>(resource, arg),
  );
}
