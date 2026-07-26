import { fetcher, patchJson, type ApiError } from "@/lib/fetcher";
import type { UserDTO, UserProfileUpdateDTO } from "@shared/schemas/users.schema";
import type { SWRConfiguration } from "swr";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export function useMe(options: SWRConfiguration<UserDTO, ApiError> = {}) {
  return useSWR<UserDTO, ApiError>("/me", fetcher, { ...options });
}

export function useMeUpdate() {
  return useSWRMutation<UserDTO, ApiError, string, UserProfileUpdateDTO>(
    "/me", (ressource, {arg}) => patchJson<UserDTO>(ressource, arg),
  );
}

