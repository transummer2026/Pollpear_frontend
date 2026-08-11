import { useRef, useState } from "react";

export function useDebounce<T>(initial: T, delayMs: number) {
  const [debounced, setDebounced] = useState(initial);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const set = (value: T) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setDebounced(value), delayMs);
  };

  return [debounced, set] as const;
}
