import { Card, CardContent } from "@/components/ui/card";
import { PanelMobileRow } from "@/components/ui/panel-mobile-row";
import FriendBadgeLarge from "@/components/me/FriendsAndRoomsMe/FriendBadgeLarge";
import FriendBadgeLargeUser from "@/components/user/FriendsAndRoomsUser/FriendBadgeLargeUser";
import FriendBadgeMobile from "@/components/me/FriendsAndRoomsMe/FriendBadgeMobile";
import RoomBadge from "@/components/me/FriendsAndRoomsMe/RoomBadge";
import RoomBadgeMobile from "@/components/me/FriendsAndRoomsMe/RoomBadgeMobile";
import type { Friend } from "@/components/me/FriendsAndRoomsMe/friends";
import { useRooms } from "@/hooks/room/use-room";

type FriendPanelMobileProps = {
  friends: Friend[];
  invitations: Friend[];
};

export default function FriendPanelMobile({
  friends,
  invitations,
}: FriendPanelMobileProps) {
  const { data } = useRooms();
  const rooms = data ?? [];

  const hasInvitations = invitations.length > 0;
  const hasFriends = friends.length > 0;
  const hasRooms = rooms.length > 0;

  if (!hasInvitations && !hasFriends && !hasRooms) {
    return null;
  }

  return (
    <Card className="w-full ring-0">
      {/* divide-y draws the separators, skipped sections leave no DOM node */}
      <CardContent className="divide-y">
        {hasInvitations && (
          <PanelMobileRow
            title="Invitations"
            items={invitations}
            getKey={(invitation) => invitation.id}
            bubbles={<FriendBadgeMobile friends={invitations} />}
            renderItem={(invitation) => (
              <FriendBadgeLargeUser friend={invitation} />
            )}
          />
        )}

        {hasFriends && (
          <PanelMobileRow
            title="PearPals"
            items={friends}
            getKey={(friend) => friend.id}
            bubbles={<FriendBadgeMobile friends={friends} />}
            renderItem={(friend) => <FriendBadgeLarge friend={friend} />}
          />
        )}

        {hasRooms && (
          <PanelMobileRow
            title="Rooms"
            items={rooms}
            getKey={(room) => room.id}
            bubbles={<RoomBadgeMobile rooms={rooms} />}
            renderItem={(room) => <RoomBadge room={room} />}
          />
        )}
      </CardContent>
    </Card>
  );
}
