import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { UserPlus } from "lucide-react";
import type { RoomReadDTO } from "@shared/schemas/rooms.schema";
import RoomAddPearticipantDialog from "@/components/room/RoomPage/Section/RoomAddPearticipantCard";
import { useIsRoomMember } from "@/hooks/room/use-pearticipants";
import { useMe } from "@/hooks/user/use-me";
import { canInviteToRoom } from "@/lib/room";

type RoomAddPearticipantButtonProps = {
  room: RoomReadDTO;
};

/**
 * Opens the invite dialog for whoever may actually invite: the owner, plus any
 * pearticipant of a public room.
 */
export default function RoomAddPearticipantButton({
  room,
}: RoomAddPearticipantButtonProps) {
  const { data: me } = useMe();
  const isMember = useIsRoomMember(room);
  const [open, setOpen] = useState(false);

  if (!canInviteToRoom(room, me?.id, isMember)) {
    return null;
  }

  return (
    <>
      <Badge
        variant="secondary"
        aria-label="Add pearticipant"
        className="group rounded-full border-2 shadow-md cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <UserPlus className="h-4 w-4 transition-transform group-hover:scale-110" />
      </Badge>
      <RoomAddPearticipantDialog
        room={room}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
}
