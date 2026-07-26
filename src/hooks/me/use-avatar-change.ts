import { ApiError, postForm } from "@/lib/fetcher";
import useSWRMutation from "swr/mutation";
import type { UserDTO } from "@shared/schemas/users.schema";

/**
 *
 * @note: useSWRMutation <what we get, errors, trigger, what we send>
 *   We send the raw File as multipart/form-data. The field name "file"
 *   must match the backend's FileInterceptor('file'). The backend re-validates
 *   mimetype/size and processes the image, so no client-side meta is needed.
 */
export function useAvatarChange() {
  return useSWRMutation<UserDTO, ApiError, string, File>(
    "/me/avatar",
    (resource, { arg }) => {
      const form = new FormData();
      form.append("file", arg);
      return postForm<UserDTO>(resource, form);
    },
  );
}
