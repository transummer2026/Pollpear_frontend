import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PaginationControls } from "@/components/ui/pagination-controls";
import { FriendsDialog } from "@/components/ui/friends-dialog";
import FriendBadgeLarge from "@/components/me/FriendsAndRoomsMe/FriendBadgeLarge";
import FriendBadgeLargeUser from "@/components/user/FriendsAndRoomsUser/FriendBadgeLargeUser";
import type { Friend } from "@/components/me/FriendsAndRoomsMe/friends";
import { usePagination } from "@/hooks/use-pagination";

const PAGE_SIZE = 4;

type FriendPanelDesktopProps = {
  friends: Friend[];
  invitations: Friend[];
};

export default function FriendPanelDesktop({
  friends,
  invitations,
}: FriendPanelDesktopProps) {
  const { page, setPage, pageCount, pageItems } = usePagination(
    friends,
    PAGE_SIZE,
  );
  const {
    page: invitationsPage,
    setPage: setInvitationsPage,
    pageCount: invitationsPageCount,
    pageItems: invitationsPageItems,
  } = usePagination(invitations, PAGE_SIZE);
  const hasInvitations = invitations.length > 0;
  const hasFriends = friends.length > 0;

  if (!hasInvitations && !hasFriends) {
    return null;
  }

  return (
    <Card className="ring-0">
      {hasInvitations && (
        <>
          <CardHeader className="text-center">
            <CardTitle className="text-lg">Invitations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1">
              {invitationsPageItems.map((invitation) => (
                <FriendBadgeLargeUser key={invitation.id} friend={invitation} />
              ))}
            </ul>
            <PaginationControls
              page={invitationsPage}
              pageCount={invitationsPageCount}
              onPageChange={setInvitationsPage}
              className="mt-2"
            />
          </CardContent>
        </>
      )}

      {hasInvitations && hasFriends && <Separator />}

      {hasFriends && (
        <>
          <CardHeader className="text-center">
            <CardTitle className="text-lg">PearPals</CardTitle>
            <CardAction>
              <FriendsDialog
                title="PearPals"
                items={friends}
                getKey={(friend) => friend.id}
                renderItem={(friend) => <FriendBadgeLarge friend={friend} />}
              />
            </CardAction>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1">
              {pageItems.map((friend) => (
                <FriendBadgeLarge key={friend.id} friend={friend} />
              ))}
            </ul>
            <PaginationControls
              page={page}
              pageCount={pageCount}
              onPageChange={setPage}
              className="mt-2"
            />
          </CardContent>
        </>
      )}
    </Card>
  );
}
