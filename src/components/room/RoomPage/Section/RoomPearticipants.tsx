import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PaginationControls } from "@/components/ui/pagination-controls";
import RoomPearticipantBadge from "@/components/room/RoomPage/Section/RoomPearticipantBadge";
import RoomAddPearticipantButton from "@/components/room/RoomPage/Section/RoomAddPearticipantButton";
import RoomPendingInvitationRow from "@/components/room/RoomPage/Section/RoomPendingInvitationRow";
import { usePagination } from "@/hooks/use-pagination";
import { useMe } from "@/hooks/user/use-me";
import { isRoomClosed, isRoomOwnedBy } from "@/lib/room";
import type { RoomReadDTO } from "@shared/schemas/rooms.schema";

const PAGE_SIZE = 6;

type RoomPearticipantsProps = {
  room: RoomReadDTO;
};

export default function RoomPearticipants({ room }: RoomPearticipantsProps) {
  const { data: me } = useMe();
  const isOwner = isRoomOwnedBy(room, me?.id);

  const pearticipants = [
    ...(room.createdBy ? [{ userId: room.createdBy.id, isOwner: true }] : []),
    ...room.roomMembers
      .filter((member) => member.userId !== room.createdById)
      .map((member) => ({ userId: member.userId, isOwner: false })),
  ];

  // Invitations that haven't been answered yet, like a pending friend request
  // on the sender side. The payload only carries the ones the viewer is a side
  // of, so a member who invited someone into a public room sees their own here;
  // RoomPendingInvitationRow decides who gets the cancel button.
  const pending = room.invitations.filter(
    (invitation) => invitation.status === "pending",
  );
  const canKick = isOwner && !isRoomClosed(room);

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
                kickFromRoomId={
                  canKick && !pearticipant.isOwner ? room.id : undefined
                }
              />
            ))}
          </ul>
        )}
        <PaginationControls
          page={page}
          pageCount={pageCount}
          onPageChange={setPage}
          className="mt-2"
        />

        {pending.length > 0 && (
          <>
            <Separator className="my-3" />
            <p className="mb-1 text-center text-xs text-muted-foreground">
              {pending.length} pending invitation
              {pending.length > 1 ? "s" : ""}
            </p>
            <ul className="space-y-1">
              {pending.map((invitation) => (
                <li key={invitation.inviteeId}>
                  <RoomPendingInvitationRow
                    roomId={room.id}
                    invitation={invitation}
                  />
                </li>
              ))}
            </ul>
          </>
        )}
      </CardContent>
    </Card>
  );
}
