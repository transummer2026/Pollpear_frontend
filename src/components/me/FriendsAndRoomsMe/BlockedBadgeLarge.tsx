import { Item, ItemTitle } from "@/components/ui/item";
import { Link } from "react-router";
import BlockedAvatar from "@/components/me/FriendsAndRoomsMe/BlockedAvatar";
import BlockedActions from "@/components/me/FriendsAndRoomsMe/BlockedActions";
import type { BlockedUser } from "@/components/me/FriendsAndRoomsMe/blocks";

export default function BlockedBadgeLarge({ user }: { user: BlockedUser }) {
  return (
    <Item className="flex items-center justify-between gap-2 p-2 border-b border-gray-200">
      <Link
        to={`/users/${user.id}`}
        className="flex min-w-0 flex-1 items-center"
      >
        <BlockedAvatar user={user} />
        <ItemTitle className="ml-4 min-w-0 flex-1">{user.name}</ItemTitle>
      </Link>
      <BlockedActions userId={user.id} />
    </Item>
  );
}
