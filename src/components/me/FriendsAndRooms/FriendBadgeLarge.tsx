import { Item, ItemTitle } from "@/components/ui/item";
import { Link } from "react-router";
import FriendAvatar from "@/components/me/FriendsAndRooms/FriendAvatar";
import FriendActions from "@/components/me/FriendsAndRooms/FriendActions";
import type { Friend } from "@/components/me/FriendsAndRooms/friends";

function truncate(name: string): string {
  return name.length > 12 ? name.slice(0, 10) + "…" : name;
}

export default function FriendBadgeLarge({ friend }: { friend: Friend }) {
  return (
    <Item className="flex items-center justify-between p-2 m-1 border-b border-gray-200">
      <div className="flex items-center">
        <Link to={`/user/${friend.id}`}>
          <FriendAvatar friend={friend} />
        </Link>
        <ItemTitle className="ml-4">{truncate(friend.name)}</ItemTitle>
      </div>
      <FriendActions friendId={friend.id} />
    </Item>
  );
}
