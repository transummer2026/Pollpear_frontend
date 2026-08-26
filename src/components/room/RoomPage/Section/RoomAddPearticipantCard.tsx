import { Link } from "react-router";
import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Item, ItemTitle } from "@/components/ui/item";
import { PaginationControls } from "@/components/ui/pagination-controls";
import FriendAvatarUser from "@/components/user/FriendsAndRoomsUser/FriendAvatarUser";
import {
  sortByStatus,
  toFriend,
} from "@/components/user/FriendsAndRoomsUser/friends";
import { useFriends } from "@/hooks/friend/use-friendship";
import { useMe } from "@/hooks/user/use-me";
import { usePagination } from "@/hooks/use-pagination";

const PAGE_SIZE = 6;

type RoomAddPearticipantDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function RoomAddPearticipantDialog({
  open,
  onOpenChange,
}: RoomAddPearticipantDialogProps) {
  const { data: me } = useMe();
  const { data } = useFriends(me?.id);
  const friends = sortByStatus((data ?? []).map(toFriend));
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
          <p className="text-center text-sm text-muted-foreground">
            No PearPal to invite yet
          </p>
        ) : (
          <>
            <ul className="space-y-1">
              {pageItems.map((friend) => (
                <li key={friend.id}>
                  <Item className="flex items-center justify-between gap-2 p-2 border-b border-gray-200">
                    <Link
                      to={`/users/${friend.id}`}
                      className="flex min-w-0 flex-1 items-center"
                    >
                      <FriendAvatarUser friend={friend} />
                      <ItemTitle className="ml-4 min-w-0 flex-1 truncate">
                        {friend.name}
                      </ItemTitle>
                    </Link>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      aria-label={`Invite ${friend.name}`}
                      onClick={() => {}}
                    >
                      <UserPlus className="h-4 w-4" />
                    </Button>
                  </Item>
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
