import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/auth/use-auth";
import {
  useFriendshipWithUser,
  useSendFriendRequest,
  useUpdateFriendship,
  useRemoveFriendship,
} from "@/hooks/friend/use-friendship";
import { useBlockStatus } from "@/hooks/friend/use-block";
import { useSWRConfig } from "swr";
import { toast } from "sonner";
import { ApiError } from "@/lib/fetcher";

type FriendshipButtonProps = {
  userId: number;
};

export default function FriendshipButton({ userId }: FriendshipButtonProps) {
  const { data: me } = useAuth();
  const { data: friendship } = useFriendshipWithUser(userId);
  const { data: blockStatus } = useBlockStatus(userId);
  const { mutate } = useSWRConfig();

  const { trigger: sendRequest, isMutating: isSending } =
    useSendFriendRequest(userId);
  const { trigger: updateFriendship, isMutating: isUpdating } =
    useUpdateFriendship(userId);
  const { trigger: removeFriendship, isMutating: isRemoving } =
    useRemoveFriendship(userId);

  const isMutating = isSending || isUpdating || isRemoving;

  if (blockStatus?.blockedByMe) {
    return null;
  }

  async function runAction(action: () => Promise<unknown>) {
    try {
      await action();
      await mutate(`/users/${userId}/friendship`);
      await mutate(`/users/${userId}/friends`);
      if (me) {
        await mutate(`/users/${me.id}/friends`);
        await mutate(`/users/${me.id}/friend-requests`);
      }
    } catch (e) {
      if (e instanceof ApiError) toast.error(e.message);
      else toast.error("An unknown error occurred");
    }
  }

  if (!friendship || friendship.status === "rejected") {
    return (
      <Button
        type="button"
        className="cursor-pointer"
        variant="outline"
        disabled={isMutating}
        onClick={() => runAction(() => sendRequest())}
      >
        Add friend
      </Button>
    );
  }

  const isRequester = friendship.requesterId === me?.id;

  if (friendship.status === "pending" && isRequester) {
    return (
      <Button
        type="button"
        className="cursor-pointer"
        variant="outline"
        disabled={isMutating}
        onClick={() => runAction(() => removeFriendship())}
      >
        Cancel request
      </Button>
    );
  }

  if (friendship.status === "pending" && !isRequester) {
    return (
      <div className="flex gap-2">
        <Button
          type="button"
          className="cursor-pointer"
          variant="outline"
          disabled={isMutating}
          onClick={() =>
            runAction(() => updateFriendship({ status: "rejected" }))
          }
        >
          Decline
        </Button>
        <Button
          type="button"
          className="cursor-pointer"
          disabled={isMutating}
          onClick={() =>
            runAction(() => updateFriendship({ status: "accepted" }))
          }
        >
          Accept
        </Button>
      </div>
    );
  }

  return (
    <Button
      type="button"
      className="cursor-pointer"
      variant="outline"
      disabled={isMutating}
      onClick={() => runAction(() => removeFriendship())}
    >
      Remove friend
    </Button>
  );
}
