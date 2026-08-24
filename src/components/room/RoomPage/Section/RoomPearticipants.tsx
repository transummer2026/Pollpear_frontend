import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PaginationControls } from "@/components/ui/pagination-controls";
import RoomPearticipantBadge from "@/components/room/RoomPage/Section/RoomPearticipantBadge";
import RoomAddPearticipantButton from "@/components/room/RoomPage/Section/RoomAddPearticipantButton";
import { usePagination } from "@/hooks/use-pagination";
import type { RoomReadDTO } from "@shared/schemas/rooms.schema";

const PAGE_SIZE = 6;

type RoomPearticipantsProps = {
  room: RoomReadDTO;
};

export default function RoomPearticipants({ room }: RoomPearticipantsProps) {
  const pearticipants = [
    ...(room.createdBy ? [{ userId: room.createdBy.id, isOwner: true }] : []),
    ...room.roomMembers
      .filter((member) => member.userId !== room.createdById)
      .map((member) => ({ userId: member.userId, isOwner: false })),
  ];

  const { page, setPage, pageCount, pageItems } = usePagination(
    pearticipants,
    PAGE_SIZE,
  );

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-lg">Pearticipants</CardTitle>
        <CardAction className="flex items-center gap-2">
          <Badge variant="secondary">{pearticipants.length}</Badge>
          <RoomAddPearticipantButton room={room} />
        </CardAction>
      </CardHeader>
      <CardContent>
        {pearticipants.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground">
            No pearticipant yet
          </p>
        ) : (
          <ul className="space-y-1">
            {pageItems.map((pearticipant) => (
              <RoomPearticipantBadge
                key={pearticipant.userId}
                userId={pearticipant.userId}
                isOwner={pearticipant.isOwner}
              />
            ))}
          </ul>
        )}
        {room.invitations.length > 0 && (
          <p className="mt-2 text-center text-xs text-muted-foreground">
            {room.invitations.length} pending invitation
            {room.invitations.length > 1 ? "s" : ""}
          </p>
        )}
        <PaginationControls
          page={page}
          pageCount={pageCount}
          onPageChange={setPage}
          className="mt-2"
        />
      </CardContent>
    </Card>
  );
}
