import { Badge } from "@/components/ui/badge";
import { Unlock } from "lucide-react";
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
      className="cursor-pointer"
      aria-label="Unblock user"
      onClick={handleUnblock}
    >
      <Unlock />
    </Badge>
  );
}
