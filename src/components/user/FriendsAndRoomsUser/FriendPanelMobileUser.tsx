import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import FriendBadgeLargeUser from "@/components/user/FriendsAndRoomsUser/FriendBadgeLargeUser";
import FriendBadgeMobileUser from "@/components/user/FriendsAndRoomsUser/FriendBadgeMobileUser";
import {
  sortByStatus,
  toFriend,
} from "@/components/user/FriendsAndRoomsUser/friends";
import { useFriends } from "@/hooks/friend/use-friendship";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@/components/ui/popover";

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
    <Card className="w-full">
      <CardHeader className="text-center">
        <CardTitle className="text-lg">PearPals</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Popover>
          <PopoverTrigger asChild>
            <button className="cursor-pointer">
              <FriendBadgeMobileUser friends={friends} />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-0">
            <PopoverHeader className="text-center py-3">PearPals</PopoverHeader>
            <ScrollArea className="h-72">
              <ul className="space-y-1 p-2">
                {friends.map((friend) => (
                  <FriendBadgeLargeUser key={friend.id} friend={friend} />
                ))}
              </ul>
            </ScrollArea>
          </PopoverContent>
        </Popover>
      </CardContent>
    </Card>
  );
}
