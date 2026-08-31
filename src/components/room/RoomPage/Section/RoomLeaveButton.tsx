import { useState } from "react";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router";
import { useSWRConfig } from "swr";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import {
  useIsRoomMember,
  useLeaveOrKickParticipant,
} from "@/hooks/room/use-pearticipants";
import { useMe } from "@/hooks/user/use-me";
import { ApiError } from "@/lib/fetcher";
import { isRoomOwnedBy } from "@/lib/room";
import type { RoomReadDTO } from "@shared/schemas/rooms.schema";

type RoomLeaveButtonProps = {
  room: RoomReadDTO;
};

/**
 * Lets a pearticipant walk out of a room, the mirror of the owner's
 * close/delete buttons. Leaving means dropping one's own invitation, so the
 * button waits for the accepted invitation that put the viewer in the room —
 * the owner never has one, and a still-pending invitee isn't in yet.
 * Confirmed first: coming back needs a new invitation.
 */
export default function RoomLeaveButton({ room }: RoomLeaveButtonProps) {
  const { data: me } = useMe();
  const navigate = useNavigate();
  const { mutate } = useSWRConfig();
  const [confirming, setConfirming] = useState(false);
  const isMember = useIsRoomMember(room);
  const { trigger, isMutating } = useLeaveOrKickParticipant(
    room.id,
    me?.id ?? 0,
  );

  // The owner is bound to their room (close/delete instead); everyone else
  // who is actually in it can walk out.
  if (isRoomOwnedBy(room, me?.id) || !isMember) {
    return null;
  }

  const handleLeave = async () => {
    try {
      await trigger();
      await mutate(`/rooms/${room.id}`, undefined, { revalidate: false });
      await mutate(
        (key) => typeof key === "string" && key.startsWith("/rooms"),
      );
      setConfirming(false);
      toast.success("You left the room");
      navigate("/feed", { replace: true });
    } catch (e) {
      if (e instanceof ApiError) toast.error(e.message);
      else toast.error("An unknown error occurred");
    }
  };

  return (
    <>
      <Badge
        variant="outline"
        aria-label="Leave room"
        className="group rounded-full border-2 shadow-md cursor-pointer"
        onClick={() => setConfirming(true)}
      >
        <LogOut className="h-4 w-4 transition-transform group-hover:scale-110" />
      </Badge>

      <AlertDialog
        open={confirming}
        onOpenChange={(open) => !open && setConfirming(false)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogMedia>
              <LogOut className="text-destructive" />
            </AlertDialogMedia>
            <AlertDialogTitle>Leave this room?</AlertDialogTitle>
            <AlertDialogDescription className="space-y-2">
              <span className="block">
                Are you sure you want to leave {room.name}?
              </span>
              <span className="block">
                {room.visibility === "public"
                  ? "You can rejoin from the room page whenever you want."
                  : "You will need a new invitation to come back."}
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel type="button" disabled={isMutating}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              type="button"
              variant="destructive"
              disabled={isMutating}
              onClick={(event) => {
                event.preventDefault();
                void handleLeave();
              }}
            >
              Leave room
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
