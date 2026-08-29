import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { BlockedUser } from "@/components/me/FriendsAndRoomsMe/blocks";
import { resolveAvatarUrl } from "@/lib/avatar";

export default function BlockedAvatar({ user }: { user: BlockedUser }) {
  return (
    <Avatar>
      <AvatarImage
        src={resolveAvatarUrl(user.avatarUrl, user.name)}
        alt={user.name}
      />
      <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
}
