import { Bell, EyeOff, X } from "lucide-react";
import { Link } from "react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Item, ItemActions, ItemContent } from "@/components/ui/item";
import FriendActionsUser from "@/components/user/FriendsAndRoomsUser/FriendActionsUser";
import { ApiError } from "@/lib/fetcher";
import { useNotifications } from "@/hooks/notification/use-notifications";
import type { NotificationDTO } from "@shared/schemas/notification.schema";

function isInvitation(n: NotificationDTO) {
  return n.type === "friend_request";
}

export function NotificationsDropdown() {
  const { notifications, unreadCount, markAllRead, dismiss } =
    useNotifications();

  const ordered = [...notifications].sort(
    (a, b) => Number(isInvitation(b)) - Number(isInvitation(a)),
  );

  function onOpenChange(open: boolean) {
    if (open) void markAllRead();
  }

  async function onDismiss(id: number) {
    try {
      await dismiss(id);
    } catch (e) {
      if (e instanceof ApiError) toast.error(e.message);
      else toast.error("An unknown error occurred");
    }
  }

  return (
    <DropdownMenu onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          aria-label="Notifications"
          className="relative"
        >
          <Bell />
          {unreadCount > 0 && (
            <span
              className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-medium text-white"
              aria-label={`${unreadCount} unread notifications`}
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {ordered.length === 0 ? (
          <p className="px-2 py-6 text-center text-sm text-muted-foreground">
            No notifications yet
          </p>
        ) : (
          <ul className="max-h-96 overflow-y-auto">
            {ordered.map((notification) => (
              <Item key={notification.id} className="gap-2 p-2">
                <ItemContent
                  className={`text-sm ${
                    notification.isRead ? "text-muted-foreground" : ""
                  }`}
                >
                  {notification.actorId ? (
                    <Link
                      to={`/users/${notification.actorId}`}
                      className="hover:underline"
                    >
                      {notification.content}
                    </Link>
                  ) : (
                    notification.content
                  )}
                </ItemContent>
                <ItemActions className="gap-1">
                  {isInvitation(notification) && notification.actorId && (
                    <FriendActionsUser friendId={notification.actorId} />
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-6 shrink-0 text-muted-foreground"
                    aria-label={
                      isInvitation(notification)
                        ? "Ignore invitation"
                        : "Dismiss notification"
                    }
                    onClick={() => void onDismiss(notification.id)}
                  >
                    {isInvitation(notification) ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <X className="size-4" />
                    )}
                  </Button>
                </ItemActions>
              </Item>
            ))}
          </ul>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
