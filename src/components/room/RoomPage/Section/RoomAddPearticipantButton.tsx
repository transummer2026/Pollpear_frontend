import { Badge } from "@/components/ui/badge";
import { UserPlus } from "lucide-react";
import type { RoomReadDTO } from "@shared/schemas/rooms.schema";
import { useMe } from "@/hooks/user/use-me";
import { isRoomOwnedBy } from "@/lib/room";

type RoomAddPearticipantButtonProps = {
  room: RoomReadDTO;
  onAdd?: () => void;
};

export default function RoomAddPearticipantButton({
  room,
  onAdd,
}: RoomAddPearticipantButtonProps) {
  const { data: me } = useMe();

  if (!isRoomOwnedBy(room, me?.id)) return null;

  return (
    <Badge
      variant="secondary"
      aria-label="Add pearticipant"
      className="group rounded-full border-2 shadow-md cursor-pointer"
      onClick={onAdd}
    >
      <UserPlus className="h-4 w-4 transition-transform group-hover:scale-110" />
    </Badge>
  );
}
