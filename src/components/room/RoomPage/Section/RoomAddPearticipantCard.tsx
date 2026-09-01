import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PaginationControls } from "@/components/ui/pagination-controls";
import RoomAddPearticipantRow from "@/components/room/RoomPage/Section/RoomAddPearticipantRow";
import {
  sortByStatus,
  toFriend,
} from "@/components/user/FriendsAndRoomsUser/friends";
import { useFriends } from "@/hooks/friend/use-friendship";
import { useMe } from "@/hooks/user/use-me";
import { usePagination } from "@/hooks/use-pagination";
import type { RoomReadDTO } from "@shared/schemas/rooms.schema";

const PAGE_SIZE = 6;

type RoomAddPearticipantDialogProps = {
  room: RoomReadDTO;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function RoomAddPearticipantDialog({
  room,
  open,
  onOpenChange,
}: RoomAddPearticipantDialogProps) {
  const { data: me } = useMe();
  const { data } = useFriends(me?.id);

  const memberIds = new Set(room.roomMembers.map((member) => member.userId));
  const invitedIds = new Set(
    room.invitations
      .filter((invitation) => invitation.status === "pending")
      .map((invitation) => invitation.inviteeId),
  );

  // members are already in, only pending invitees stay listed, marked as such
  const friends = sortByStatus(
    (data ?? []).map(toFriend).filter((friend) => !memberIds.has(friend.id)),
  );
  const { page, setPage, pageCount, pageItems } = usePagination(
    friends,
    PAGE_SIZE,
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90svh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-center">Add pearticipants</DialogTitle>
        </DialogHeader>
        {friends.length === 0 ? (
          <p className="text-center text-base text-muted-foreground">
            No PearPal to invite yet
          </p>
        ) : (
          <>
            <ul className="space-y-1">
              {pageItems.map((friend) => (
                <li key={friend.id}>
                  <RoomAddPearticipantRow
                    roomId={room.id}
                    friend={friend}
                    isInvited={invitedIds.has(friend.id)}
                  />
                </li>
              ))}
            </ul>
            <PaginationControls
              page={page}
              pageCount={pageCount}
              onPageChange={setPage}
            />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
