import { useNotifications } from "@/hooks/notification/use-notifications";
import { cn } from "@/lib/utils";

type NotificationBadgeProps = {
  className?: string;
};

/**
 * The unread count, as a dot over whatever it is placed on — positioned
 * absolutely, so the caller owns the offsets. Renders nothing at zero, and
 * caps at "9+": past that the exact number changes nothing.
 *
 * `aria-hidden` because the count is already in the trigger's label; screen
 * readers should hear it once.
 */
export function NotificationBadge({ className }: NotificationBadgeProps) {
  const { unreadCount } = useNotifications();

  if (unreadCount === 0) return null;

  return (
    <span
      aria-hidden
      className={cn(
        "absolute flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-sm font-medium text-white",
        className,
      )}
    >
      {unreadCount > 9 ? "9+" : unreadCount}
    </span>
  );
}
