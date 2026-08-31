import type { ReactNode } from "react";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import { cn } from "@/lib/utils";

type MobileNavItemBodyProps = {
  label: string;
  active?: boolean;
} & (
  | { icon: IconSvgElement; children?: never }
  /** The profile tab shows the user's avatar instead of an icon. */
  | { icon?: never; children: ReactNode }
);

/**
 * Inner content of a bottom-bar tab: active indicator and icon. The label is
 * kept for screen readers only — the bar shows icons alone.
 */
/**
 * The inside of one bottom-nav tab: the active bar, the icon, and a label kept
 * for screen readers only — five visible labels would not fit the width.
 */
export function MobileNavItemBody({
  label,
  active,
  icon,
  children,
}: MobileNavItemBodyProps) {
  return (
    <span className="flex flex-col items-center">
      <span
        aria-hidden
        className={cn(
          "absolute inset-x-3 top-0 h-0.5 rounded-full bg-primary transition-opacity",
          active ? "opacity-100" : "opacity-0",
        )}
      />
      {icon ? (
        <HugeiconsIcon
          icon={icon}
          strokeWidth={active ? 2.4 : 1.8}
          className="size-6"
        />
      ) : (
        children
      )}
      <span className="sr-only">{label}</span>
    </span>
  );
}
