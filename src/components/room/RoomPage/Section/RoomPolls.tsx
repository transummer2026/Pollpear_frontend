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
import PollColumns from "@/components/poll/PollColumns";
import { usePagination } from "@/hooks/use-pagination";
import type { RoomReadDTO } from "@shared/schemas/rooms.schema";

const PAGE_SIZE = 12;

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
      <CardContent>
        {room.polls.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground">
            No poll in this room yet
          </p>
        ) : (
          <PollColumns polls={pageItems} roomId={room.id} />
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
