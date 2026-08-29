import type { ComponentType, SVGProps } from "react";
import { cn } from "@/lib/utils";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

type HoverIconProps = {
  /** drawn at rest, usually the current state */
  idle: IconComponent;
  /** drawn on hover, usually what the action is about to do */
  hover: IconComponent;
  className?: string;
};

/**
 * Swaps two drawings of the same icon on hover, for the pairs that exist in
 * both states (trash/open trash, locked/unlocked).
 *
 * The parent must carry the `group` class: the swap keys off its hover, not
 * the icon's own, so it also triggers from the button's padding.
 */
export function HoverIcon({
  idle: Idle,
  hover: Hover,
  className,
}: HoverIconProps) {
  return (
    <>
      <Idle className={cn("group-hover:hidden", className)} />
      <Hover className={cn("hidden group-hover:block", className)} />
    </>
  );
}
