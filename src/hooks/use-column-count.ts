import { useEffect, useState } from "react";

/** Tailwind `md` and `xl`, kept in sync with the poll layout breakpoints. */
const TWO_COLUMNS_BREAKPOINT = 768;
const THREE_COLUMNS_BREAKPOINT = 1280;

export type ColumnCount = 1 | 2 | 3;

function readColumnCount(): ColumnCount {
  if (typeof window === "undefined") return 1;
  if (window.innerWidth >= THREE_COLUMNS_BREAKPOINT) return 3;
  if (window.innerWidth >= TWO_COLUMNS_BREAKPOINT) return 2;

  return 1;
}

/**
 * Number of columns a list should be split into, mirroring what
 * `columns-1 md:columns-2 xl:columns-3` would do in CSS. Needed in JS because
 * the split itself is done by count, which CSS cannot express.
 */
export function useColumnCount(): ColumnCount {
  const [columnCount, setColumnCount] = useState<ColumnCount>(readColumnCount);

  useEffect(() => {
    const queries = [
      window.matchMedia(`(min-width: ${TWO_COLUMNS_BREAKPOINT}px)`),
      window.matchMedia(`(min-width: ${THREE_COLUMNS_BREAKPOINT}px)`),
    ];
    const onChange = () => setColumnCount(readColumnCount());

    queries.forEach((query) => query.addEventListener("change", onChange));
    onChange();

    return () =>
      queries.forEach((query) => query.removeEventListener("change", onChange));
  }, []);

  return columnCount;
}
