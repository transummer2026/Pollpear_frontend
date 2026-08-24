import { Badge } from "@/components/ui/badge";
import { Lock, Pencil, Trash } from "lucide-react";
import { useState } from "react";
import type { RoomReadDTO } from "@shared/schemas/rooms.schema";
import { useMe } from "@/hooks/user/use-me";
import { isRoomOwnedBy } from "@/lib/room";
import RoomUpdateDialog from "@/components/room/RoomPage/Section/RoomUpdateDialog";

type RoomOwnerButtonsProps = {
  room: RoomReadDTO;
  onClose?: () => void;
  onDelete?: () => void;
};

export default function RoomOwnerButtons({
  room,
  onClose,
  onDelete,
}: RoomOwnerButtonsProps) {
  const { data: me } = useMe();
  const [isEditing, setIsEditing] = useState(false);

  if (!isRoomOwnedBy(room, me?.id)) return null;

  return (
    <>
      <div className="flex gap-2">
        <Badge
          variant="secondary"
          aria-label="Edit room"
          className="group rounded-full border-2 shadow-md cursor-pointer"
          onClick={() => setIsEditing(true)}
        >
          <Pencil className="h-4 w-4 transition-transform group-hover:rotate-12" />
        </Badge>

        <Badge
          variant="outline"
          aria-label="Close room"
          className="group rounded-full border-2 shadow-md cursor-pointer"
          onClick={onClose}
        >
          <Lock className="h-4 w-4 transition-transform group-hover:scale-110" />
        </Badge>

        <Badge
          variant="destructive"
          aria-label="Delete room"
          className="cursor-pointer"
          onClick={onDelete}
        >
          <Trash />
        </Badge>
      </div>

      <RoomUpdateDialog
        room={room}
        open={isEditing}
        onOpenChange={setIsEditing}
      />
    </>
  );
}
