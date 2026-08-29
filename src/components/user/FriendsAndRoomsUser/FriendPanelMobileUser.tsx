import { Card, CardContent } from "@/components/ui/card";
import { PanelMobileRow } from "@/components/ui/panel-mobile-row";
import FriendBadgeLargeUser from "@/components/user/FriendsAndRoomsUser/FriendBadgeLargeUser";
import FriendBadgeMobileUser from "@/components/user/FriendsAndRoomsUser/FriendBadgeMobileUser";
import {
  sortByStatus,
  toFriend,
} from "@/components/user/FriendsAndRoomsUser/friends";
import { useFriends } from "@/hooks/friend/use-friendship";

type FriendPanelMobileUserProps = {
  id: number;
};

export default function FriendPanelMobileUser({
  id,
}: FriendPanelMobileUserProps) {
  const { data } = useFriends(id);
  const friends = sortByStatus((data ?? []).map(toFriend));

  if (friends.length === 0) {
    return null;
  }

  return (
    <Card className="w-full ring-0">
      <CardContent className="divide-y">
        <PanelMobileRow
          title="PearPals"
          items={friends}
          getKey={(friend) => friend.id}
          bubbles={<FriendBadgeMobileUser friends={friends} />}
          renderItem={(friend) => <FriendBadgeLargeUser friend={friend} />}
        />
      </CardContent>
    </Card>
  );
}
