import { useRef, useState } from "react";

/**
 * A value that only settles once the caller has stopped setting it for
 * `delayMs`. Each call cancels the pending one, so a search box re-renders on
 * every keystroke while the request behind it waits for the typing to pause.
 */
export function useDebounce<T>(initial: T, delayMs: number) {
  const [debounced, setDebounced] = useState(initial);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const set = (value: T) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setDebounced(value), delayMs);
  };

  return [debounced, set] as const;
}
