import * as React from "react";

// Tailwind's `md`: below it the app switches to its mobile layout.
const MOBILE_BREAKPOINT = 768;

/**
 * Whether the viewport is in mobile territory, for the layout decisions CSS
 * cannot make on its own (which component to mount, not merely how to style
 * it). Undefined until the effect has run, coerced to false — the first paint
 * assumes desktop rather than guessing.
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined,
  );

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}
