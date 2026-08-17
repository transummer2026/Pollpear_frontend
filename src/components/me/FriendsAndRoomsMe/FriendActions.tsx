import { Badge } from "@/components/ui/badge";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import { useSWRConfig } from "swr";
import { ApiError } from "@/lib/fetcher";
import { useAuth } from "@/hooks/auth/use-auth";
import { useRemoveFriendship } from "@/hooks/friend/use-friendship";

export default function FriendActions({ friendId }: { friendId: number }) {
  const { data: me } = useAuth();
  const { trigger: removeFriendship, isMutating } =
    useRemoveFriendship(friendId);
  const { mutate } = useSWRConfig();

  async function handleRemove() {
    if (isMutating) return;
    try {
      await removeFriendship();
      await mutate(`/users/${friendId}/friendship`);
      await mutate(`/users/${friendId}/friends`);
      if (me) await mutate(`/users/${me.id}/friends`);
    } catch (e) {
      if (e instanceof ApiError) toast.error(e.message);
      else toast.error("An unknown error occurred");
    }
  }

  return (
    <Badge
      variant="destructive"
      className="cursor-pointer"
      aria-label="Remove friend"
      onClick={handleRemove}
    >
      <Trash />
    </Badge>
  );
}
