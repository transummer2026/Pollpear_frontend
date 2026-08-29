import { Link } from "react-router";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Item, ItemTitle } from "@/components/ui/item";
import RoomKickPearticipantButton from "@/components/room/RoomPage/Section/RoomKickPearticipantButton";
import { statusBadgeClass } from "@/components/user/FriendsAndRoomsUser/friends";
import { useAuth } from "@/hooks/auth/use-auth";
import { useFriends } from "@/hooks/friend/use-friendship";
import { useUser } from "@/hooks/user/use-user";

type RoomPearticipantBadgeProps = {
  userId: number;
  isOwner?: boolean;
  /** room to kick this pearticipant out of; omitted when the viewer can't */
  kickFromRoomId?: number;
};

export default function RoomPearticipantBadge({
  userId,
  isOwner = false,
  kickFromRoomId,
}: RoomPearticipantBadgeProps) {
  const { data: user } = useUser(userId);
  const { data: me } = useAuth();
  const { data: friends } = useFriends(me?.id);

  const username = user?.username ?? "…";
  const friend = friends?.find((item) => item.user.id === userId);
  const isMe = userId === me?.id;

  return (
    <Item className="flex items-center justify-between gap-2 p-2 border-b border-border/50">
      <Link
        to={`/users/${userId}`}
        className="flex min-w-0 flex-1 items-center"
      >
        <Avatar>
          <AvatarImage src={user?.avatarUrl} alt={`${username} avatar`} />
          <AvatarFallback>{username.slice(0, 2).toUpperCase()}</AvatarFallback>
          {friend && (
            <AvatarBadge
              className={statusBadgeClass(
                friend.user.isOnline ? "online" : "offline",
              )}
            />
          )}
        </Avatar>
        <ItemTitle className="ml-4 min-w-0 flex-1 truncate">
          {username}
          {isMe && (
            <span className="ml-1 text-xs text-muted-foreground">(you)</span>
          )}
        </ItemTitle>
      </Link>
      {isOwner && <Badge variant="outline">Pearent</Badge>}
      {kickFromRoomId !== undefined && (
        <RoomKickPearticipantButton
          roomId={kickFromRoomId}
          userId={userId}
          username={username}
        />
      )}
    </Item>
  );
}
