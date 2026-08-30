import { fetcher, type ApiError } from "@/lib/fetcher";
import type { UserPublicProfileDTO } from "@shared/schemas/users.schema";
import type { SWRConfiguration } from "swr";
import useSWR from "swr";

export function useUser(
  id?: number,
  options: SWRConfiguration<UserPublicProfileDTO, ApiError> = {},
) {
  return useSWR<UserPublicProfileDTO, ApiError>(
    id ? `/users/${id}` : null,
    fetcher,
    {
      ...options,
    },
  );
}
