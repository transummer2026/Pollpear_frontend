import { Link } from "react-router";
import FriendAvatar from "@/components/me/FriendsAndRoomsMe/FriendAvatar";
import type { Friend } from "@/components/me/FriendsAndRoomsMe/friends";

export default function FriendBadgeFeed({ friend }: { friend: Friend }) {
  return (
    <Link
      to={`/users/${friend.id}`}
      className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-muted"
    >
      <FriendAvatar friend={friend} />
      <span className="min-w-0 flex-1 truncate text-sm font-medium">
        {friend.name}
      </span>
    </Link>
  );
}
