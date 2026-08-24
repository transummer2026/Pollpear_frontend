import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PaginationControls } from "@/components/ui/pagination-controls";
import PollCard from "@/components/poll/PollCard";
import { usePagination } from "@/hooks/use-pagination";
import type { RoomReadDTO } from "@shared/schemas/rooms.schema";

const PAGE_SIZE = 6;

type RoomPollsProps = {
  room: RoomReadDTO;
};

export default function RoomPolls({ room }: RoomPollsProps) {
  const { page, setPage, pageCount, pageItems } = usePagination(
    room.polls,
    PAGE_SIZE,
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Polls</CardTitle>
        <CardAction>
          <Badge variant="secondary">{room.polls.length}</Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="columns-1 md:columns-2 gap-5">
        {room.polls.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground">
            No poll in this room yet
          </p>
        ) : (
          pageItems.map((poll) => (
            <div key={poll.id} className="mb-5 break-inside-avoid">
              <PollCard poll={poll} />
            </div>
          ))
        )}
      </CardContent>
      <CardFooter>
        <PaginationControls
          page={page}
          pageCount={pageCount}
          onPageChange={setPage}
          className="mt-2"
        />
      </CardFooter>
    </Card>
  );
}
