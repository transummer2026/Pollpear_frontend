import { useNotifications } from "@/hooks/notification/use-notifications";
import { cn } from "@/lib/utils";

type NotificationBadgeProps = {
  className?: string;
};

export function NotificationBadge({ className }: NotificationBadgeProps) {
  const { unreadCount } = useNotifications();

  if (unreadCount === 0) return null;

  return (
    <span
      aria-hidden
      className={cn(
        "absolute flex h-4 min-w-4 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-medium text-white",
        className,
      )}
    >
      {unreadCount > 9 ? "9+" : unreadCount}
    </span>
  );
}
