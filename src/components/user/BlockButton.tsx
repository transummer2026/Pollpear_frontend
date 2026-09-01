import { Button } from "@/components/ui/button";
import { BlockedIcon, LockedIcon, UnlockedIcon } from "@/components/icons";
import { HoverIcon } from "@/components/icons/HoverIcon";
import { useAuth } from "@/hooks/auth/use-auth";
import {
  useBlockStatus,
  useBlockUser,
  useUnblockUser,
} from "@/hooks/friend/use-block";
import { useSWRConfig } from "swr";
import { toast } from "sonner";
import { ApiError } from "@/lib/fetcher";

type BlockButtonProps = {
  userId: number;
};

/**
 * Block or unblock, from someone else's profile. Blocking severs whatever tied
 * the two accounts — the friendship goes with it — so the viewer's own lists
 * are revalidated alongside the block itself.
 */
export default function BlockButton({ userId }: BlockButtonProps) {
  const { data: me } = useAuth();
  const { data: blockStatus } = useBlockStatus(userId);
  const { mutate } = useSWRConfig();

  const { trigger: blockUser, isMutating: isBlocking } = useBlockUser(userId);
  const { trigger: unblockUser, isMutating: isUnblocking } =
    useUnblockUser(userId);

  const isMutating = isBlocking || isUnblocking;

  async function runAction(action: () => Promise<unknown>) {
    if (isMutating) return;
    try {
      await action();
      await mutate(`/users/${userId}/block`);
      await mutate(`/users/${userId}/friendship`);
      if (me) {
        await mutate(`/users/${me.id}/friends`);
        await mutate(`/users/${me.id}/friend-requests`);
        await mutate(`/users/${me.id}/blocks`);
      }
    } catch (e) {
      if (e instanceof ApiError) toast.error(e.message);
      else toast.error("An unknown error occurred");
    }
  }

  if (blockStatus?.blockedByMe) {
    return (
      <Button
        type="button"
        size="icon-lg"
        variant="outline"
        className="group cursor-pointer rounded-full"
        aria-label="Unblock user"
        title="Unblock"
        disabled={isMutating}
        onClick={() => runAction(() => unblockUser())}
      >
        <HoverIcon idle={LockedIcon} hover={UnlockedIcon} className="size-5" />
      </Button>
    );
  }

  return (
    <Button
      type="button"
      size="icon-lg"
      variant="destructive"
      className="group cursor-pointer rounded-full"
      aria-label="Block user"
      title="Block"
      disabled={isMutating}
      onClick={() => runAction(() => blockUser())}
    >
      <BlockedIcon className="size-5" />
    </Button>
  );
}
