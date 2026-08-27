import type { ReactNode } from "react";
import { Bell, EyeOff, X } from "lucide-react";
import { Link } from "react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemGroup,
} from "@/components/ui/item";
import FriendActionsUser from "@/components/user/FriendsAndRoomsUser/FriendActionsUser";
import { ApiError } from "@/lib/fetcher";
import { useNotifications } from "@/hooks/notification/use-notifications";
import { useAuth } from "@/hooks/auth/use-auth";
import { useFriendRequests } from "@/hooks/friend/use-friendship";
import { cn } from "@/lib/utils";
import type { NotificationDTO } from "@shared/schemas/notification.schema";

type NotificationsDropdownProps = {
  /** Custom trigger; defaults to the outlined bell button of the navbar. */
  children?: ReactNode;
  align?: "start" | "center" | "end";
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
  collisionPadding?: number;
  className?: string;
};

function isInvitation(n: NotificationDTO) {
  return n.type === "friend_request";
}

export function NotificationsDropdown({
  children,
  align = "end",
  side,
  sideOffset,
  collisionPadding,
  className,
}: NotificationsDropdownProps) {
  const { notifications, unreadCount, markAllRead, dismiss } =
    useNotifications();
  const { data: me } = useAuth();
  const { data: friendRequests } = useFriendRequests(me?.id);
  const pendingFrom = new Set((friendRequests ?? []).map((r) => r.user.id));

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
        {children ?? (
          <Button
            variant="outline"
            size="icon"
            aria-label={
              unreadCount > 0
                ? `Notifications, ${unreadCount} unread`
                : "Notifications"
            }
            className="relative"
          >
            <Bell />
            {unreadCount > 0 && (
              <span
                className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-medium text-white"
                aria-hidden
              >
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={cn("w-80", className)}
        align={align}
        side={side}
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
      >
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {ordered.length === 0 ? (
          <p className="px-2 py-6 text-center text-sm text-muted-foreground">
            No notifications yet
          </p>
        ) : (
          <ItemGroup className="max-h-96 overflow-y-auto">
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
                      className="block w-full"
                    >
                      <DropdownMenuItem className="p-0 hover:underline">
                        {notification.content}
                      </DropdownMenuItem>
                    </Link>
                  ) : (
                    notification.content
                  )}
                </ItemContent>
                <ItemActions className="gap-1">
                  {isInvitation(notification) &&
                    notification.actorId &&
                    pendingFrom.has(notification.actorId) && (
                      <FriendActionsUser
                        friendId={notification.actorId}
                        friendship={{
                          status: "pending",
                          requesterId: notification.actorId,
                        }}
                      />
                    )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-6 shrink-0 text-muted-foreground"
                    aria-label="Dismiss notification"
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
          </ItemGroup>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
