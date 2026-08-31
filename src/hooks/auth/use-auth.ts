import { useMe } from "@/hooks/user/use-me";

/**
 * The session as the UI sees it. Reads the same `/me` key as useMe — so the
 * answer is shared with the rest of the page rather than fetched twice — but
 * without retries: a signed-out visitor gets one 401 and settles on
 * `isAuthenticated: false` instead of the gateway being asked again. `mutate`
 * is exposed so a screen that just changed the session can refresh it.
 */
export function useAuth() {
  const { data, error, isLoading, mutate } = useMe({
    shouldRetryOnError: false,
  });
  return { data, isLoading, mutate, isAuthenticated: !!data && !error };
}
