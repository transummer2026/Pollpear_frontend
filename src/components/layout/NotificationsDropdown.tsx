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
import RoomInvitationActions from "@/components/room/RoomInvitationActions";
import { NotificationBadge } from "@/components/layout/NotificationBadge";
import { ApiError } from "@/lib/fetcher";
import { useNotifications } from "@/hooks/notification/use-notifications";
import { useAuth } from "@/hooks/auth/use-auth";
import { useFriendRequests } from "@/hooks/friend/use-friendship";
import { useMyRoomInvitations } from "@/hooks/room/use-pearticipants";
import { cn } from "@/lib/utils";
import type { InvitationReadDTO } from "@shared/schemas/invitations.schema";
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

function isFriendRequest(n: NotificationDTO) {
  return n.type === "friend_request";
}

function isRoomInvitation(n: NotificationDTO) {
  return n.type === "room_invitation";
}

/** Something still waiting on an answer: sorted first, dismissed with an eye. */
function isInvitation(n: NotificationDTO) {
  return isFriendRequest(n) || isRoomInvitation(n);
}

/**
 * The invitation a room_invitation notification stands for, if it is still
 * pending. A Notification carries no roomId — only its actor and its text —
 * so the inviter narrows the list and the room name, which the content spells
 * out, tells two invitations from the same inviter apart.
 */
function matchRoomInvitation(
  notification: NotificationDTO,
  invitations: InvitationReadDTO[],
) {
  const fromActor = invitations.filter(
    (invitation) => invitation.inviterId === notification.actorId,
  );

  return (
    fromActor.find((invitation) =>
      notification.content.includes(invitation.room.name),
    ) ?? fromActor[0]
  );
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
  const { data: roomInvitations } = useMyRoomInvitations(me?.id);
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
            size="icon-lg"
            aria-label={
              unreadCount > 0
                ? `Notifications, ${unreadCount} unread`
                : "Notifications"
            }
            className="relative"
          >
            <Bell />
            <NotificationBadge className="-right-1 -top-1" />
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
            {ordered.map((notification) => {
              const roomInvitation = isRoomInvitation(notification)
                ? matchRoomInvitation(notification, roomInvitations ?? [])
                : undefined;
              // A room invitation should land on the room, not the inviter's
              // profile — the invitee can read a public room straight away, and
              // a private one opens on its accept/decline panel.
              const target = roomInvitation
                ? `/rooms/${roomInvitation.roomId}`
                : notification.actorId
                  ? `/users/${notification.actorId}`
                  : undefined;

              return (
                <Item key={notification.id} className="gap-2 p-2">
                  <ItemContent
                    className={`text-sm ${
                      notification.isRead ? "text-muted-foreground" : ""
                    }`}
                  >
                    {target ? (
                      <Link to={target} className="block w-full">
                        <DropdownMenuItem className="p-0 hover:underline">
                          {notification.content}
                        </DropdownMenuItem>
                      </Link>
                    ) : (
                      notification.content
                    )}
                    {roomInvitation?.message && (
                      <span className="mt-0.5 block line-clamp-2 text-sm italic text-muted-foreground">
                        “{roomInvitation.message}”
                      </span>
                    )}
                  </ItemContent>
                  <ItemActions className="gap-1">
                    {isFriendRequest(notification) &&
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
                    {roomInvitation && (
                      <RoomInvitationActions
                        roomId={roomInvitation.roomId}
                        invitation={roomInvitation}
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
              );
            })}
          </ItemGroup>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
