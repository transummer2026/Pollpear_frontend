import { HugeiconsIcon } from "@hugeicons/react";
import { Door01Icon } from "@hugeicons/core-free-icons";
import { CommandGroup, CommandItem } from "@/components/ui/command";
import type { RoomSearchResultDTO } from "@shared/schemas/search.schema";

type RoomSearchGroupProps = {
  rooms: RoomSearchResultDTO[];
  onSelect: (roomId: number) => void;
};

export function RoomSearchGroup({ rooms, onSelect }: RoomSearchGroupProps) {
  if (rooms.length === 0) return null;

  return (
    <CommandGroup heading="Rooms">
      {rooms.map((room) => (
        <CommandItem
          key={room.id}
          value={`room-${room.id}`}
          onSelect={() => onSelect(room.id)}
        >
          <HugeiconsIcon
            icon={Door01Icon}
            strokeWidth={2}
            className="size-4 opacity-70"
          />
          {room.name}
        </CommandItem>
      ))}
    </CommandGroup>
  );
}
