/**
 * SWR compares cache keys by strict equality, so `mutate("/polls")` misses
 * `/polls?voted=true` and `/feed?limit=25` despite the shared prefix. After a
 * vote we want every poll-derived list to revalidate without the vote widgets
 * having to know each caller's query string (the feed's `limit` lives in the
 * feed page, six vote components down).
 *
 * Pass this predicate to `mutate` to hit any mounted poll or feed key.
 */
export const pollKeys = (key: unknown): boolean =>
  typeof key === "string" &&
  (key === "/polls" ||
    key.startsWith("/polls/") ||
    key.startsWith("/polls?") ||
    key === "/feed" ||
    key.startsWith("/feed?"));
