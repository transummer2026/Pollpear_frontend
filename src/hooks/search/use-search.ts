import { useState } from "react";
import useSWR from "swr";
import { fetcher, type ApiError } from "@/lib/fetcher";
import { useDebounce } from "@/hooks/use-debounce";
import type {
  SearchScope,
  SearchResultsDTO,
} from "@shared/schemas/search.schema";

const MIN_QUERY_LENGTH = 2;
const DEBOUNCE_MS = 300;

export function useSearch(scope: SearchScope) {
  const [text, setText] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useDebounce("", DEBOUNCE_MS);

  const onQueryChange = (value: string) => {
    setText(value);
    setDebouncedQuery(value.trim());
  };

  const shouldSearch = debouncedQuery.length >= MIN_QUERY_LENGTH;
  const params = new URLSearchParams({ q: debouncedQuery, type: scope });

  const swr = useSWR<SearchResultsDTO, ApiError>(
    shouldSearch ? `/search?${params.toString()}` : null,
    fetcher,
    { keepPreviousData: true },
  );

  return { text, onQueryChange, ...swr };
}
