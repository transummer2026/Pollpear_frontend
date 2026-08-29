import { Badge } from "@/components/ui/badge";
import { Check, X, UserMinus } from "lucide-react";
import { AddIcon } from "@/components/icons";
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
import type { FriendshipDTO } from "@shared/schemas/friendship.schema";

type KnownFriendship = {
  status: FriendshipDTO["status"];
  requesterId: number;
} | null;

export default function FriendActionsUser({
  friendId,
  friendship: known,
}: {
  friendId: number;
  friendship?: KnownFriendship;
}) {
  const { data: me } = useAuth();
  const { data: fetched, isLoading } = useFriendshipWithUser(
    known === undefined ? friendId : undefined,
  );
  const friendship = known === undefined ? fetched : known;
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

  if (known === undefined && isLoading) {
    return (
      <div className="flex gap-1" aria-hidden>
        <Badge variant="secondary" className="invisible">
          <X />
        </Badge>
        <Badge variant="default" className="invisible">
          <Check />
        </Badge>
      </div>
    );
  }

  if (!friendship || friendship.status === "rejected") {
    return (
      <Badge
        variant="link"
        className="cursor-pointer"
        aria-label="Add friend"
        onClick={() => runAction(() => sendRequest())}
      >
        <AddIcon />
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
          className="cursor-pointer bg-[#FFE0E0] text-[#885053] hover:bg-[#FFE0E0]/80"
          aria-label="Decline friend request"
          onClick={() =>
            runAction(() => updateFriendship({ status: "rejected" }))
          }
        >
          <X />
        </Badge>
        <Badge
          variant="default"
          className="cursor-pointer bg-[#3A4336] text-white hover:bg-[#3A4336]/80"
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
