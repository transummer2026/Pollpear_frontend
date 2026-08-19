import { AvatarGroup, AvatarGroupCount } from "@/components/ui/avatar";
import FriendAvatar from "@/components/me/FriendsAndRoomsMe/FriendAvatar";
import {
  sortByStatus,
  type Friend,
} from "@/components/me/FriendsAndRoomsMe/friends";

export default function FriendBadgeMobile({ friends }: { friends: Friend[] }) {
  const shown = sortByStatus(friends).slice(0, 3);
  const extra = Math.max(friends.length - 3, 0);

  return (
    <AvatarGroup className="cursor-pointer">
      {shown.map((friend) => (
        <FriendAvatar key={friend.id} friend={friend} />
      ))}
      {extra > 0 && <AvatarGroupCount>+{extra}</AvatarGroupCount>}
    </AvatarGroup>
  );
}
