import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { UserPlus } from "lucide-react";
import type { RoomReadDTO } from "@shared/schemas/rooms.schema";
import RoomAddPearticipantDialog from "@/components/room/RoomPage/Section/RoomAddPearticipantCard";
import { useMe } from "@/hooks/user/use-me";
import { isRoomClosed, isRoomOwnedBy } from "@/lib/room";

type RoomAddPearticipantButtonProps = {
  room: RoomReadDTO;
};

export default function RoomAddPearticipantButton({
  room,
}: RoomAddPearticipantButtonProps) {
  const { data: me } = useMe();
  const [open, setOpen] = useState(false);

  if (!isRoomOwnedBy(room, me?.id) || isRoomClosed(room)) return null;

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
      <RoomAddPearticipantDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
