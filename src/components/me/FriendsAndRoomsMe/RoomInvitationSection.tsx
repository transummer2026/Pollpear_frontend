import { HugeiconsIcon } from "@hugeicons/react";
import { Door01Icon } from "@hugeicons/core-free-icons";
import { Link } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { PaginationControls } from "@/components/ui/pagination-controls";
import RoomInvitationActions from "@/components/room/RoomInvitationActions";
import { useAuth } from "@/hooks/auth/use-auth";
import { useMyRoomInvitations } from "@/hooks/room/use-pearticipants";
import { usePagination } from "@/hooks/use-pagination";

const PAGE_SIZE = 4;
const NO_INVITATIONS: never[] = [];

/**
 * Rooms the viewer has been invited to but hasn't answered yet, listed next to
 * the rooms they are already in. The room itself isn't linked: until the
 * invitation is accepted a private room stays unreadable, so the only way
 * forward is the accept/decline pair.
 */
export default function RoomInvitationSection() {
  const { data: me } = useAuth();
  const { data: invitations } = useMyRoomInvitations(me?.id);
  const { page, setPage, pageCount, pageItems } = usePagination(
    invitations ?? NO_INVITATIONS,
    PAGE_SIZE,
  );

  if (!invitations?.length) return null;

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-lg">Room invitations</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-1">
          {pageItems.map((invitation) => (
            <li key={invitation.id}>
              <Item variant="outline">
                <ItemMedia variant="icon">
                  <HugeiconsIcon icon={Door01Icon} strokeWidth={2} />
                </ItemMedia>
                <ItemContent className="min-w-0">
                  <ItemTitle className="truncate">
                    {invitation.room.name}
                  </ItemTitle>
                  <ItemDescription className="truncate">
                    <Link
                      to={`/users/${invitation.inviterId}`}
                      className="hover:underline"
                    >
                      Invited by {invitation.inviter.username}
                    </Link>
                  </ItemDescription>
                  {invitation.message && (
                    <ItemDescription className="mt-0.5 line-clamp-2 italic">
                      “{invitation.message}”
                    </ItemDescription>
                  )}
                </ItemContent>
                <RoomInvitationActions
                  roomId={invitation.roomId}
                  invitation={invitation}
                />
              </Item>
            </li>
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
