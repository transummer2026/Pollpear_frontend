import { AvatarGroup, AvatarGroupCount } from "@/components/ui/avatar";
import FriendAvatarUser from "@/components/user/FriendsAndRoomsUser/FriendAvatarUser";
import {
  sortByStatus,
  type Friend,
} from "@/components/user/FriendsAndRoomsUser/friends";

export default function FriendBadgeMobileUser({
  friends,
}: {
  friends: Friend[];
}) {
  const shown = sortByStatus(friends).slice(0, 3);
  const extra = Math.max(friends.length - 3, 0);

  return (
    <AvatarGroup className="cursor-pointer">
      {shown.map((friend) => (
        <FriendAvatarUser key={friend.id} friend={friend} />
      ))}
      {extra > 0 && <AvatarGroupCount>+{extra}</AvatarGroupCount>}
    </AvatarGroup>
  );
}
