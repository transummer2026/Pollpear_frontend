import { ApiError, postJson } from "@/lib/fetcher";
import useSWRMutation from "swr/mutation";

/**
 * Ends the session; the response clears the cookie. Nothing else is cleaned up
 * here — callers navigate away, which unmounts the cached views with them.
 */
export function useLogout() {
  return useSWRMutation<void, ApiError, string>(
    "/auth/logout",
    (resource, { arg }) => postJson<void>(resource, arg),
  );
}
