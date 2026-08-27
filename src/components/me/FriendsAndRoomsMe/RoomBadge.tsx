import { Link } from "react-router";
import { HugeiconsIcon } from "@hugeicons/react";
import { Door01Icon } from "@hugeicons/core-free-icons";
import { Item, ItemMedia, ItemContent, ItemTitle } from "@/components/ui/item";
import type { RoomReadDTO } from "@shared/schemas/rooms.schema";

export default function RoomBadge({ room }: { room: RoomReadDTO }) {
  return (
    <Item asChild variant="outline">
      <Link to={`/rooms/${room.id}`}>
        <ItemMedia variant="icon">
          <HugeiconsIcon icon={Door01Icon} strokeWidth={2} />
        </ItemMedia>
        <ItemContent className="min-w-0">
          <ItemTitle className="truncate">{room.name}</ItemTitle>
        </ItemContent>
      </Link>
    </Item>
  );
}
