import type { ReactNode } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import { useSWRConfig } from "swr";
import { Badge } from "@/components/ui/badge";
import {
  useCancelRoomInvitation,
  useLeaveOrKickParticipant,
} from "@/hooks/room/use-pearticipants";
import { ApiError } from "@/lib/fetcher";
import { cn } from "@/lib/utils";

type RoomPearticipantRemoveButtonProps = {
  roomId: number;
  userId: number;
  /**
   * `"invitation"` cancels a still-pending invite (DELETE /invitations/:id);
   * `"participant"` removes an accepted member — leave or kick — through
   * DELETE /participants/:id, which also drops their `roomMember` row.
   */
  mode: "invitation" | "participant";
  /** aria-label, e.g. "Cancel invitation to Bob" */
  label: string;
  successMessage: string;
  icon?: ReactNode;
  variant?: "secondary" | "outline" | "destructive";
};

/**
 * Cancelling a pending invitation and removing an accepted member look the
 * same — one X on a row — so they share this button; only `mode`, the wording
 * and the icon change. One button owns one mutation: the hooks bind a single
 * (roomId, userId) pair, so it can't be hoisted into the list that renders it.
 */
export default function RoomPearticipantRemoveButton({
  roomId,
  userId,
  mode,
  label,
  successMessage,
  icon,
  variant = "secondary",
}: RoomPearticipantRemoveButtonProps) {
  const { mutate } = useSWRConfig();
  const cancelInvitation = useCancelRoomInvitation(roomId, userId);
  const leaveOrKick = useLeaveOrKickParticipant(roomId, userId);
  const { trigger, isMutating } =
    mode === "invitation" ? cancelInvitation : leaveOrKick;

  const remove = async () => {
    if (isMutating) return;
    try {
      await trigger();
      await mutate(`/rooms/${roomId}`);
      await mutate(`/rooms/${roomId}/invitations/${userId}`);
      toast.success(successMessage);
    } catch (e) {
      if (e instanceof ApiError) toast.error(e.message);
      else toast.error("An unknown error occurred");
    }
  };

  return (
    <Badge
      variant={variant}
      aria-label={label}
      className={cn(
        "cursor-pointer",
        isMutating && "pointer-events-none opacity-50",
      )}
      onClick={remove}
    >
      {icon ?? <X className="h-3 w-3" />}
    </Badge>
  );
}
