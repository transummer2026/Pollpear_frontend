import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PaginationControls } from "@/components/ui/pagination-controls";
import { FriendsDialog } from "@/components/ui/friends-dialog";
import FriendBadgeLargeUser from "@/components/user/FriendsAndRoomsUser/FriendBadgeLargeUser";
import {
  sortByStatus,
  toFriend,
} from "@/components/user/FriendsAndRoomsUser/friends";
import { useFriends } from "@/hooks/friend/use-friendship";
import { usePagination } from "@/hooks/use-pagination";

const PAGE_SIZE = 4;

type FriendPanelDesktopUserProps = {
  id: number;
};

export default function FriendPanelDesktopUser({
  id,
}: FriendPanelDesktopUserProps) {
  const { data } = useFriends(id);
  const friends = sortByStatus((data ?? []).map(toFriend));
  const { page, setPage, pageCount, pageItems } = usePagination(
    friends,
    PAGE_SIZE,
  );

  if (friends.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-lg">PearPals</CardTitle>
        <CardAction>
          <FriendsDialog
            title="PearPals"
            items={friends}
            getKey={(friend) => friend.id}
            renderItem={(friend) => <FriendBadgeLargeUser friend={friend} />}
          />
        </CardAction>
      </CardHeader>
      <CardContent>
        <ul className="space-y-1">
          {pageItems.map((friend) => (
            <FriendBadgeLargeUser key={friend.id} friend={friend} />
          ))}
        </ul>
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
