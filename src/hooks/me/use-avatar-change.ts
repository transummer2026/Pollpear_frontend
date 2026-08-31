import { ApiError, postForm } from "@/lib/fetcher";
import useSWRMutation from "swr/mutation";
import type { UserDTO } from "@shared/schemas/users.schema";

/**
 * Replaces the signed-in user's avatar and answers with the updated user.
 *
 * The raw File goes out as multipart/form-data under the field name "file",
 * which has to match the backend's FileInterceptor('file'). Mimetype and size
 * are re-checked there, and the image is resized server-side, so nothing but
 * the file itself is worth sending.
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
