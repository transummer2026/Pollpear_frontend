import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { BlockedUser } from "@/components/me/FriendsAndRoomsMe/blocks";
export default function BlockedAvatar({ user }: { user: BlockedUser }) {
  return (
    <Avatar>
      <AvatarImage src={user.avatarUrl} alt={user.name} />
      <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
}
