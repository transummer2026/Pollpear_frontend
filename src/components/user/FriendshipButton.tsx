import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { AddIcon, OpenTrashIcon, TrashIcon } from "@/components/icons";
import { HoverIcon } from "@/components/icons/HoverIcon";
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

/**
 * The single friendship control on a profile, showing whichever of add, accept,
 * decline or remove applies to the current state. Hidden outright for someone
 * the viewer has blocked: the answer there is to unblock first.
 *
 * A friendship touches both accounts, so every action revalidates both sides'
 * lists — the other user's, and the viewer's own.
 */
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
        size="icon-lg"
        variant="outline"
        className="group cursor-pointer rounded-full"
        aria-label="Add friend"
        title="Add friend"
        disabled={isMutating}
        onClick={() => runAction(() => sendRequest())}
      >
        <AddIcon className="size-5" />
      </Button>
    );
  }

  const isRequester = friendship.requesterId === me?.id;

  if (friendship.status === "pending" && isRequester) {
    return (
      <Button
        type="button"
        size="icon-lg"
        variant="outline"
        className="group cursor-pointer rounded-full"
        aria-label="Cancel friend request"
        title="Cancel request"
        disabled={isMutating}
        onClick={() => runAction(() => removeFriendship())}
      >
        <X className="size-5" />
      </Button>
    );
  }

  if (friendship.status === "pending" && !isRequester) {
    return (
      <div className="flex gap-2">
        <Button
          type="button"
          size="icon-lg"
          variant="outline"
          className="group cursor-pointer rounded-full bg-[#FFE0E0] text-[#885053] hover:bg-[#FFE0E0]/80"
          aria-label="Decline friend request"
          title="Decline"
          disabled={isMutating}
          onClick={() =>
            runAction(() => updateFriendship({ status: "rejected" }))
          }
        >
          <X className="size-5" />
        </Button>
        <Button
          type="button"
          size="icon-lg"
          className="group cursor-pointer rounded-full bg-[#3A4336] text-white hover:bg-[#3A4336]/80"
          aria-label="Accept friend request"
          title="Accept"
          disabled={isMutating}
          onClick={() =>
            runAction(() => updateFriendship({ status: "accepted" }))
          }
        >
          <Check className="size-5" />
        </Button>
      </div>
    );
  }

  return (
    <Button
      type="button"
      size="icon-lg"
      variant="outline"
      className="group cursor-pointer rounded-full"
      aria-label="Remove friend"
      title="Remove friend"
      disabled={isMutating}
      onClick={() => runAction(() => removeFriendship())}
    >
      <HoverIcon idle={TrashIcon} hover={OpenTrashIcon} className="size-5" />
    </Button>
  );
}
