import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AddIcon } from "@/components/icons";
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
      <Button
        type="button"
        size="icon"
        variant="secondary"
        aria-label="Add pearticipant"
        title="Add pearticipant"
        className="group cursor-pointer rounded-full shadow-md"
        onClick={() => setOpen(true)}
      >
        <AddIcon className="transition-transform group-hover:scale-110" />
      </Button>
      <RoomAddPearticipantDialog
        room={room}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
}
