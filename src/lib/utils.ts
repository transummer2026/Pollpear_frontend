import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Builds a class string where a later Tailwind utility overrides an earlier one
 * of the same kind ("p-2" then "p-4" yields "p-4"), which plain concatenation
 * cannot do. Every component funnels its `className` prop through this so a
 * caller can always override the defaults.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
