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

/**
 * Uploads a new avatar (multipart/form-data, field "file").
 * We POST to /me/avatar but bind the mutation to the "/me" key so the profile
 * (and its avatarUrl) is revalidated on success.
 *
 * @note: no Content-Type header — the browser sets the multipart boundary itself.
 */
export function useAvatarUpload() {
  return useSWRMutation<UserDTO, ApiError, string, File>(
    "/me",
    (_ressource, { arg }) => {
      const formData = new FormData();
      formData.append("file", arg);
      return fetcher<UserDTO>("/me/avatar", { method: "POST", body: formData });
    },
  );
}
