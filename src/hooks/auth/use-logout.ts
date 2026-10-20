import { ApiError, postJson } from "@/lib/fetcher";
import { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";

/**
 * Ends the session and empties the SWR cache.
 *
 * The cache has to be cleared here rather than left to unmount: it is global
 * and keyed by resource, not owned by the views reading it, so signing in as
 * someone else in the same tab would otherwise be served the previous user's
 * `/me`, `/rooms` and friends until each key revalidated.
 *
 * A 401 is swallowed on purpose. The gateway answers it when the session is
 * already gone from redis — an expired ttl, a logout in another tab, a second
 * click — and clears the cookie on its way out. There is nothing left to end,
 * which is exactly what the caller asked for, so reporting it as a failure
 * would strand a signed-out visitor on a page they can no longer use.
 */
export function useLogout() {
  const { mutate } = useSWRConfig();
  const { trigger, isMutating } = useSWRMutation<void, ApiError, string>(
    "/auth/logout",
    (resource, { arg }) => postJson<void>(resource, arg),
  );

  const logout = async () => {
    try {
      await trigger();
    } catch (error) {
      if (!(error instanceof ApiError) || error.status !== 401) throw error;
    } finally {
      // Match every key, drop its data, and do not refetch: the session is
      // gone, so a revalidation would only fire a wave of 401s.
      await mutate(() => true, undefined, { revalidate: false });
    }
  };

  return { logout, isMutating };
}
