import { Link } from "react-router";
import { HugeiconsIcon } from "@hugeicons/react";
import { Door01Icon } from "@hugeicons/core-free-icons";
import { Item, ItemMedia, ItemContent, ItemTitle } from "@/components/ui/item";
import type { RoomSearchResultDTO } from "@shared/schemas/search.schema";

/** One room in the search results. */
export function RoomResultItem({ room }: { room: RoomSearchResultDTO }) {
  return (
    <Item asChild variant="outline">
      <Link to={`/rooms/${room.id}`}>
        <ItemMedia variant="icon">
          <HugeiconsIcon icon={Door01Icon} strokeWidth={2} />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>{room.name}</ItemTitle>
        </ItemContent>
      </Link>
    </Item>
  );
}
