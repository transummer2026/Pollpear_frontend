import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  statusBadgeClass,
  type Friend,
} from "@/components/me/FriendsAndRoomsMe/friends";
export default function FriendAvatar({ friend }: { friend: Friend }) {
  return (
    <Avatar>
      <AvatarImage src={friend.avatarUrl} alt={friend.name} />
      <AvatarFallback>{friend.name.slice(0, 2).toUpperCase()}</AvatarFallback>
      <AvatarBadge className={statusBadgeClass(friend.status)} />
    </Avatar>
  );
}
