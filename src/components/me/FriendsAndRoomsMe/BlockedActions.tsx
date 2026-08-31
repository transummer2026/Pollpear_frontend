import { Badge } from "@/components/ui/badge";
import { LockedIcon, UnlockedIcon } from "@/components/icons";
import { HoverIcon } from "@/components/icons/HoverIcon";
import { toast } from "sonner";
import { useSWRConfig } from "swr";
import { ApiError } from "@/lib/fetcher";
import { useAuth } from "@/hooks/auth/use-auth";
import { useUnblockUser } from "@/hooks/friend/use-block";

export default function BlockedActions({ userId }: { userId: number }) {
  const { data: me } = useAuth();
  const { trigger: unblockUser, isMutating } = useUnblockUser(userId);
  const { mutate } = useSWRConfig();

  async function handleUnblock() {
    if (isMutating) return;
    try {
      await unblockUser();
      await mutate(`/users/${userId}/block`);
      if (me) await mutate(`/users/${me.id}/blocks`);
    } catch (e) {
      if (e instanceof ApiError) toast.error(e.message);
      else toast.error("An unknown error occurred");
    }
  }

  return (
    <Badge
      variant="outline"
      className="group cursor-pointer"
      aria-label="Unblock user"
      onClick={handleUnblock}
    >
      <HoverIcon idle={LockedIcon} hover={UnlockedIcon} />
    </Badge>
  );
}
