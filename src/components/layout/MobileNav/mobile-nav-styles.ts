import { cn } from "@/lib/utils";

/**
 * Shared look for the five tabs of <MobileBottomNav />. A class builder rather
 * than a wrapper component because each tab is a different element: a router
 * <Link>, a plain <button>, and the `asChild` triggers of the notifications
 * dropdown and the create menu.
 */
export function mobileNavItemClass(active?: boolean, className?: string) {
  return cn(
    "relative flex h-full w-full flex-col items-center justify-center rounded-none px-1 py-0 outline-none transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/50",
    active ? "text-primary" : "text-muted-foreground hover:text-foreground",
    className,
  );
}
