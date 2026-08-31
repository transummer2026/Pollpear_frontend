import { Link } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Item, ItemTitle } from "@/components/ui/item";
import RoomPearticipantRemoveButton from "@/components/room/RoomPage/Section/RoomPearticipantRemoveButton";
import { useMe } from "@/hooks/user/use-me";
import type { InvitationReadDTO } from "@shared/schemas/invitations.schema";

type RoomPendingInvitationRowProps = {
  roomId: number;
  invitation: InvitationReadDTO;
};

/**
 * A pearticipant who hasn't answered yet, with the X that cancels the
 * invitation — the room counterpart of a pending friend request in
 * FriendActionsUser.
 */
export default function RoomPendingInvitationRow({
  roomId,
  invitation,
}: RoomPendingInvitationRowProps) {
  const { data: me } = useMe();
  const { invitee } = invitation;

  // The room payload lists every pending invitation, but only the two sides of
  // one may cancel it — in a public room another member could be the inviter.
  const canCancel =
    invitation.inviterId === me?.id || invitation.inviteeId === me?.id;

  return (
    <Item className="flex items-center justify-between gap-2 p-2 border-b border-gray-200">
      <Link
        to={`/users/${invitee.id}`}
        className="flex min-w-0 flex-1 items-center"
      >
        <Avatar className="opacity-60">
          <AvatarImage
            src={invitee.avatarUrl}
            alt={`${invitee.username} avatar`}
          />
          <AvatarFallback>
            {invitee.username.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <ItemTitle className="ml-4 min-w-0 flex-1 truncate text-muted-foreground">
          {invitee.username}
        </ItemTitle>
      </Link>

      {canCancel && (
        <RoomPearticipantRemoveButton
          roomId={roomId}
          userId={invitee.id}
          mode="invitation"
          label={`Cancel invitation to ${invitee.username}`}
          successMessage={`Invitation to ${invitee.username} cancelled`}
        />
      )}
    </Item>
  );
}
