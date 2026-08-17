import { Item, ItemTitle } from "@/components/ui/item";
import { Link } from "react-router";
import FriendAvatar from "@/components/me/FriendsAndRoomsMe/FriendAvatar";
import FriendActions from "@/components/me/FriendsAndRoomsMe/FriendActions";
import type { Friend } from "@/components/me/FriendsAndRoomsMe/friends";

export default function FriendBadgeLarge({ friend }: { friend: Friend }) {
  return (
    <Item className="flex items-center justify-between gap-2 p-2 border-b border-gray-200">
      <Link
        to={`/users/${friend.id}`}
        className="flex min-w-0 flex-1 items-center"
      >
        <FriendAvatar friend={friend} />
        <ItemTitle className="ml-4 min-w-0 flex-1">{friend.name}</ItemTitle>
      </Link>
      <FriendActions friendId={friend.id} />
    </Item>
  );
}
