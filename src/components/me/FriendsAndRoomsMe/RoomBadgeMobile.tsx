import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "@/components/ui/avatar";
import type { RoomReadDTO } from "@shared/schemas/rooms.schema";

const SHOWN = 3;

export default function RoomBadgeMobile({ rooms }: { rooms: RoomReadDTO[] }) {
  const shown = rooms.slice(0, SHOWN);
  const extra = Math.max(rooms.length - SHOWN, 0);

  return (
    <AvatarGroup className="cursor-pointer">
      {shown.map((room) => (
        <Avatar key={room.id}>
          <AvatarFallback>{room.name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
      ))}
      {extra > 0 && <AvatarGroupCount>+{extra}</AvatarGroupCount>}
    </AvatarGroup>
  );
}
