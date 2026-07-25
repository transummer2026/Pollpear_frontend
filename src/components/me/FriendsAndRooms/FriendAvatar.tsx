import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import avatar from "@/assets/pwar.jpg";
import {
  statusBadgeClass,
  type Friend,
} from "@/components/me/FriendsAndRooms/friends";

export default function FriendAvatar({ friend }: { friend: Friend }) {
  return (
    <Avatar>
      <AvatarImage src={avatar} alt={friend.name} />
      <AvatarFallback>{friend.name.slice(0, 2).toUpperCase()}</AvatarFallback>
      <AvatarBadge className={statusBadgeClass(friend.status)} />
    </Avatar>
  );
}
