import { Link } from "react-router";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Item, ItemTitle } from "@/components/ui/item";
import { statusBadgeClass } from "@/components/user/FriendsAndRoomsUser/friends";
import { useUser } from "@/hooks/user/use-user";

type RoomPearticipantBadgeProps = {
  userId: number;
  isOwner?: boolean;
};

export default function RoomPearticipantBadge({
  userId,
  isOwner = false,
}: RoomPearticipantBadgeProps) {
  const { data: user } = useUser(userId);

  const username = user?.username ?? "…";
  const status = user?.isOnline ? "online" : "offline";

  return (
    <Item className="flex items-center justify-between gap-2 p-2 border-b border-gray-200">
      <Link
        to={`/users/${userId}`}
        className="flex min-w-0 flex-1 items-center"
      >
        <Avatar>
          <AvatarImage src={user?.avatarUrl} alt={`${username} avatar`} />
          <AvatarFallback>{username.slice(0, 2).toUpperCase()}</AvatarFallback>
          <AvatarBadge className={statusBadgeClass(status)} />
        </Avatar>
        <ItemTitle className="ml-4 min-w-0 flex-1 truncate">
          {username}
        </ItemTitle>
      </Link>
      {isOwner && <Badge variant="outline">Pearent</Badge>}
    </Item>
  );
}
