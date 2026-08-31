import { fetcher, type ApiError } from "@/lib/fetcher";
import type { UserPublicProfileDTO } from "@shared/schemas/users.schema";
import type { SWRConfiguration } from "swr";
import useSWR from "swr";

/**
 * Someone else's public profile. The key stays `null` until an id is known, so
 * a page still resolving its route param sends nothing. A private profile
 * answers 403 — an expected outcome the caller renders inline (see fetcher).
 */
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
