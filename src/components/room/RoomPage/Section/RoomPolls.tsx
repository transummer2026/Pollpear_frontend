import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { PaginationControls } from "@/components/ui/pagination-controls";
import PollColumns from "@/components/poll/PollColumns";
import { usePagination } from "@/hooks/use-pagination";
import type { RoomReadDTO } from "@shared/schemas/rooms.schema";
import RoomPollsEmpty from "@/components/room/RoomPage/Section/RoomPollsEmpty";

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

  return (
    <Card>
      <CardContent>
        {isEmpty ? (
          <RoomPollsEmpty room={room} />
        ) : (
          <PollColumns polls={pageItems} roomId={room.id} />
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
