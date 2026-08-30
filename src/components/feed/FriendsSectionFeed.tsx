import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FriendsDialog } from "@/components/ui/friends-dialog";
import FriendBadgeFeed from "@/components/feed/FriendBadgeFeed";
import {
  onlineOnly,
  toFriend,
} from "@/components/me/FriendsAndRoomsMe/friends";
import { useFriends } from "@/hooks/friend/use-friendship";
import { useMe } from "@/hooks/user/use-me";

const SHOWN = 5;

export default function FriendsSectionFeed() {
  const { data: me } = useMe();
  const { data } = useFriends(me?.id);

  if (!data) return null;

  const friends = onlineOnly(data.map(toFriend));

  return (
    <Card className="ring-0">
      <CardHeader className="text-center">
        <CardTitle className="text-lg">
          PearPals online
          <span className="ml-2 text-sm font-normal text-muted-foreground">
            {friends.length}
          </span>
        </CardTitle>
        {friends.length > SHOWN && (
          <CardAction>
            <FriendsDialog
              title="Friends online"
              items={friends}
              getKey={(friend) => friend.id}
              renderItem={(friend) => <FriendBadgeFeed friend={friend} />}
            />
          </CardAction>
        )}
      </CardHeader>

      <CardContent className="space-y-1">
        {friends.length === 0 ? (
          <p className="text-xs text-muted-foreground">
            No friends online right now.
          </p>
        ) : (
          friends
            .slice(0, SHOWN)
            .map((friend) => (
              <FriendBadgeFeed key={friend.id} friend={friend} />
            ))
        )}
      </CardContent>
    </Card>
  );
}
