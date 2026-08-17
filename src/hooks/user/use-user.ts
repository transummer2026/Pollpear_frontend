import { fetcher, type ApiError } from "@/lib/fetcher";
import type { UserDTO } from "@shared/schemas/users.schema";
import type { SWRConfiguration } from "swr";
import useSWR from "swr";

export function useUser(
  id?: number,
  options: SWRConfiguration<UserDTO, ApiError> = {},
) {
  return useSWR<UserDTO, ApiError>(id ? `/users/${id}` : null, fetcher, {
    ...options,
  });
}
