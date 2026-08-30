import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { PaginationControls } from "@/components/ui/pagination-controls";
import PollColumns from "@/components/poll/PollColumns";
import { usePagination } from "@/hooks/use-pagination";
import { isRoomClosed } from "@/lib/room";
import type { RoomReadDTO } from "@shared/schemas/rooms.schema";
import RoomAddPollCard from "@/components/room/RoomPage/Section/RoomAddPollCard";

const PAGE_SIZE = 12;

type RoomPollsProps = {
  room: RoomReadDTO;
};

export default function RoomPolls({ room }: RoomPollsProps) {
  const { page, setPage, pageCount, pageItems } = usePagination(
    room.polls,
    PAGE_SIZE,
  );

  const isEmpty = room.polls.length === 0;
  const isClosed = isRoomClosed(room);

  return (
    <Card>
      <CardContent>
        <PollColumns
          polls={pageItems}
          roomId={room.id}
          leadingCard={
            isClosed ? undefined : <RoomAddPollCard roomId={room.id} />
          }
        />
        {isEmpty && (
          <p className="mt-4 text-center text-sm text-muted-foreground">
            {isClosed
              ? "This room is closed — no new poll can be added."
              : "No poll yet — ask the first question and let the pearticipants vote."}
          </p>
        )}
      </CardContent>
      {!isEmpty && (
        <CardFooter>
          <PaginationControls
            page={page}
            pageCount={pageCount}
            onPageChange={setPage}
            className="mt-2"
          />
        </CardFooter>
      )}
    </Card>
  );
}
