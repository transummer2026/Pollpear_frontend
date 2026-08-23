import { Badge } from "@/components/ui/badge";
import { Plus, Check, X, UserMinus } from "lucide-react";
import { toast } from "sonner";
import { useSWRConfig } from "swr";
import { ApiError } from "@/lib/fetcher";
import { useAuth } from "@/hooks/auth/use-auth";
import {
  useFriendshipWithUser,
  useSendFriendRequest,
  useUpdateFriendship,
  useRemoveFriendship,
} from "@/hooks/friend/use-friendship";

export default function FriendActionsUser({ friendId }: { friendId: number }) {
  const { data: me } = useAuth();
  const { data: friendship } = useFriendshipWithUser(friendId);
  const { mutate } = useSWRConfig();

  const { trigger: sendRequest, isMutating: isSending } =
    useSendFriendRequest(friendId);
  const { trigger: updateFriendship, isMutating: isUpdating } =
    useUpdateFriendship(friendId);
  const { trigger: removeFriendship, isMutating: isRemoving } =
    useRemoveFriendship(friendId);

  const isMutating = isSending || isUpdating || isRemoving;

  if (friendId === me?.id) return null;

  async function runAction(action: () => Promise<unknown>) {
    if (isMutating) return;
    try {
      await action();
      await mutate(`/users/${friendId}/friendship`);
      await mutate(`/users/${friendId}/friends`);
      if (me) {
        await mutate(`/users/${me.id}/friends`);
        await mutate(`/users/${me.id}/friend-requests`);
        await mutate(`/me/notifications`);
      }
    } catch (e) {
      if (e instanceof ApiError) toast.error(e.message);
      else toast.error("An unknown error occurred");
    }
  }

  if (!friendship || friendship.status === "rejected") {
    return (
      <Badge
        variant="link"
        className="cursor-pointer"
        aria-label="Add friend"
        onClick={() => runAction(() => sendRequest())}
      >
        <Plus />
      </Badge>
    );
  }

  const isRequester = friendship.requesterId === me?.id;

  if (friendship.status === "pending" && isRequester) {
    return (
      <Badge
        variant="secondary"
        className="cursor-pointer"
        aria-label="Cancel friend request"
        onClick={() => runAction(() => removeFriendship())}
      >
        <X />
      </Badge>
    );
  }

  if (friendship.status === "pending" && !isRequester) {
    return (
      <div className="flex gap-1">
        <Badge
          variant="secondary"
          className="cursor-pointer"
          aria-label="Decline friend request"
          onClick={() =>
            runAction(() => updateFriendship({ status: "rejected" }))
          }
        >
          <X />
        </Badge>
        <Badge
          variant="default"
          className="cursor-pointer"
          aria-label="Accept friend request"
          onClick={() =>
            runAction(() => updateFriendship({ status: "accepted" }))
          }
        >
          <Check />
        </Badge>
      </div>
    );
  }

  return (
    <Badge
      variant="secondary"
      className="cursor-pointer"
      aria-label="Remove friend"
      onClick={() => runAction(() => removeFriendship())}
    >
      <UserMinus />
    </Badge>
  );
}
