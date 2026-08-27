import { useEffect, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUp01Icon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** How close to the bottom the page must be for the button to show. */
const BOTTOM_THRESHOLD = 80;
/** Below this, the page is too short for the button to be worth showing. */
const MIN_SCROLLABLE = 160;

/**
 * Companion to <MobileMenuMe />: the burger sits at the very top and is not
 * sticky, so this brings the user back to it once they reach the bottom.
 */
export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      const scrollable = scrollHeight - clientHeight;
      setVisible(
        scrollable > MIN_SCROLLABLE &&
          scrollable - scrollTop < BOTTOM_THRESHOLD,
      );
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <Button
      type="button"
      size="icon-lg"
      aria-label="Back to top"
      aria-hidden={!visible}
      tabIndex={visible ? undefined : -1}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={cn(
        "fixed right-4 bottom-[calc(3.5rem+env(safe-area-inset-bottom)+1rem)] z-40 shadow-lg transition-opacity md:hidden",
        visible ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <HugeiconsIcon icon={ArrowUp01Icon} strokeWidth={2} />
    </Button>
  );
}
