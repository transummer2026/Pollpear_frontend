import { Check, X } from "lucide-react";
import { toast } from "sonner";
import { useSWRConfig } from "swr";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/auth/use-auth";
import {
  MY_ROOM_INVITATIONS_KEY,
  useCancelRoomInvitation,
  useRoomInvitation,
  useRespondToRoomInvitation,
} from "@/hooks/room/use-pearticipants";
import { ApiError } from "@/lib/fetcher";
import type { InvitationReadDTO } from "@shared/schemas/invitations.schema";

/** `undefined` → fetch the viewer's own invitation; a value (or `null`) → use it as-is. */
type KnownInvitation = InvitationReadDTO | null;

type RoomInvitationActionsProps = {
  roomId: number;
  invitation?: KnownInvitation;
};

/**
 * The pending-invitation controls for one room — the room counterpart of
 * FriendActionsUser's pending branch, reused wherever an invitation surfaces:
 * the notifications dropdown, the /me invitations list, and the room page
 * itself. Like FriendActionsUser it takes an optional known invitation and
 * only fetches (`useRoomInvitation`, which the invitee may read even on a
 * private room they're not in yet) when none is passed.
 *
 * The invitee gets accept/decline — accepting is the only way into the room,
 * it creates the membership server-side. The inviter (a member who invited
 * someone into a public room) gets a single cancel. Answering shuffles the
 * viewer between lists, hence the batch of revalidations.
 */
export default function RoomInvitationActions({
  roomId,
  invitation: known,
}: RoomInvitationActionsProps) {
  const { data: me } = useAuth();
  const { data: fetched, isLoading } = useRoomInvitation(
    known === undefined ? roomId : undefined,
    known === undefined ? me?.id : undefined,
  );
  const invitation = known === undefined ? fetched : known;
  const { mutate } = useSWRConfig();

  const respond = useRespondToRoomInvitation(roomId, me?.id ?? 0);
  const cancel = useCancelRoomInvitation(roomId, invitation?.inviteeId ?? 0);
  const isMutating = respond.isMutating || cancel.isMutating;

  const roomName = invitation?.room.name ?? "the room";

  async function runAction(action: () => Promise<unknown>, done: string) {
    if (isMutating) return;
    try {
      await action();
      await mutate(MY_ROOM_INVITATIONS_KEY);
      await mutate("/me/notifications");
      await mutate("/rooms");
      await mutate(`/rooms/${roomId}`);
      if (me?.id) await mutate(`/rooms/${roomId}/invitations/${me.id}`);
      toast.success(done);
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

  if (!invitation || invitation.status !== "pending") return null;

  if (invitation.inviteeId === me?.id) {
    return (
      <div className="flex gap-1">
        <Badge
          variant="secondary"
          className="cursor-pointer"
          aria-label={`Decline invitation to ${roomName}`}
          onClick={() =>
            void runAction(
              () => respond.trigger({ status: "rejected" }),
              `Invitation to ${roomName} declined`,
            )
          }
        >
          <X />
        </Badge>
        <Badge
          variant="default"
          className="cursor-pointer"
          aria-label={`Accept invitation to ${roomName}`}
          onClick={() =>
            void runAction(
              () => respond.trigger({ status: "accepted" }),
              `You joined ${roomName}`,
            )
          }
        >
          <Check />
        </Badge>
      </div>
    );
  }

  if (invitation.inviterId === me?.id) {
    return (
      <Badge
        variant="secondary"
        className="cursor-pointer"
        aria-label={`Cancel invitation to ${invitation.invitee.username}`}
        onClick={() =>
          void runAction(
            () => cancel.trigger(),
            `Invitation to ${invitation.invitee.username} cancelled`,
          )
        }
      >
        <X />
      </Badge>
    );
  }

  return null;
}
