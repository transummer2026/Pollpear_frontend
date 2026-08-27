import { Link } from "react-router";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { isRoomClosed } from "@/lib/room";
import type { RoomReadDTO } from "@shared/schemas/rooms.schema";

type RoomPollsEmptyProps = {
  room: RoomReadDTO;
};

export default function RoomPollsEmpty({ room }: RoomPollsEmptyProps) {
  const isClosed = isRoomClosed(room);

  return (
    <Empty className="border bg-muted/20 px-6 py-10 sm:py-12">
      <EmptyHeader>
        <EmptyTitle>No poll yet</EmptyTitle>
        <EmptyDescription>
          {isClosed
            ? "This room is closed — no new poll can be added."
            : "Ask the first question and let the pearticipants vote."}
        </EmptyDescription>
      </EmptyHeader>
      {!isClosed && (
        <EmptyContent>
          <Button
            asChild
            variant="outline"
            className="w-full invisible lg:visible"
          >
            <Link to={`/polls/new?roomId=${room.id}`}>
              <Plus />
              New poll
            </Link>
          </Button>
        </EmptyContent>
      )}
    </Empty>
  );
}
