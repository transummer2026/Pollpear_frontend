import { useState } from "react";
import useSWR from "swr";
import { fetcher, type ApiError } from "@/lib/fetcher";
import { useDebounce } from "@/hooks/use-debounce";
import type {
  SearchScope,
  SearchSort,
  SearchResultsDTO,
} from "@shared/schemas/search.schema";

// A single letter matches most of the database: not worth a round trip, and
// the result list would be useless anyway.
const MIN_QUERY_LENGTH = 2;
const DEBOUNCE_MS = 300;

type UseSearchOptions = {
  initialQuery?: string;
  page?: number;
  limit?: number;
  sortBy?: SearchSort;
};

/**
 * Search over users, rooms or polls, wired for a live input: `text` follows
 * every keystroke so the field stays responsive, while the request waits for
 * the typing to pause and only leaves once the query is long enough (the key is
 * `null` below that, so nothing is sent).
 *
 * `keepPreviousData` holds the previous results on screen while the next ones
 * load — without it the list blanks out at every keystroke.
 */
export function useSearch(
  scope: SearchScope,
  { initialQuery = "", page, limit, sortBy }: UseSearchOptions = {},
) {
  const [text, setText] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useDebounce(
    initialQuery,
    DEBOUNCE_MS,
  );

  const onQueryChange = (value: string) => {
    setText(value);
    setDebouncedQuery(value.trim());
  };

  const shouldSearch = debouncedQuery.length >= MIN_QUERY_LENGTH;
  const params = new URLSearchParams({ q: debouncedQuery, type: scope });
  if (page !== undefined) params.set("page", String(page));
  if (limit !== undefined) params.set("limit", String(limit));
  if (sortBy !== undefined) params.set("sortBy", sortBy);

  const swr = useSWR<SearchResultsDTO, ApiError>(
    shouldSearch ? `/search?${params.toString()}` : null,
    fetcher,
    { keepPreviousData: true },
  );

  return { text, onQueryChange, ...swr };
}
