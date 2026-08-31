import { useMemo, useState } from "react";

/**
 * Client-side paging over an already-loaded list — the API returns these in
 * full, only the display is split. The page is clamped to what the list can
 * still offer, so removing the last row of the last page falls back to the new
 * last one instead of showing an empty slice.
 */
export function usePagination<T>(items: T[], pageSize: number) {
  const [page, setPage] = useState(1);
  const pageCount = Math.max(1, Math.ceil(items.length / pageSize));
  const safePage = Math.min(page, pageCount);

  const pageItems = useMemo(
    () => items.slice((safePage - 1) * pageSize, safePage * pageSize),
    [items, pageSize, safePage],
  );

  return { page: safePage, setPage, pageCount, pageItems };
}
