import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { useUser } from "@/hooks/user/use-user";
import { useAuth } from "@/hooks/auth/use-auth";
import { useFriends } from "@/hooks/friend/use-friendship";
import { cn } from "@/lib/utils";
import { statusBadgeClass } from "./FriendsAndRoomsUser/friends";

type AvatarUserProps = {
  id: number;
};

export default function AvatarUser({ id }: AvatarUserProps) {
  const { data: user } = useUser(id);
  const { data: me } = useAuth();
  const { data: friends } = useFriends(me?.id);

  const friend = friends?.find((item) => item.user.id === id);

  return (
    <div className="relative h-40 w-40">
      <Avatar className="h-40 w-40 rounded-full object-cover border-2">
        <AvatarImage src={user?.avatarUrl} alt={`${user?.username} avatar`} />
        <AvatarFallback>
          {user?.username?.slice(0, 2).toUpperCase()}
        </AvatarFallback>
        {friend && (
          <AvatarBadge
            className={cn(
              "right-2 bottom-2 ring-4 group-data-[size=default]/avatar:size-7",
              statusBadgeClass(friend.user.isOnline ? "online" : "offline"),
            )}
          />
        )}
      </Avatar>
    </div>
  );
}
