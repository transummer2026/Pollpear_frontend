import { Item, ItemTitle } from "@/components/ui/item";
import { Link } from "react-router";
import FriendAvatarUser from "@/components/user/FriendsAndRoomsUser/FriendAvatarUser";
import FriendActionsUser from "@/components/user/FriendsAndRoomsUser/FriendActionsUser";
import type { Friend } from "@/components/user/FriendsAndRoomsUser/friends";

export default function FriendBadgeLargeUser({ friend }: { friend: Friend }) {
  return (
    <Item className="flex items-center justify-between gap-2 p-2 border-b border-border/50">
      <Link
        to={`/users/${friend.id}`}
        className="flex min-w-0 flex-1 items-center"
      >
        <FriendAvatarUser friend={friend} />
        <ItemTitle className="ml-4 min-w-0 flex-1">{friend.name}</ItemTitle>
      </Link>
      <FriendActionsUser friendId={friend.id} />
    </Item>
  );
}
