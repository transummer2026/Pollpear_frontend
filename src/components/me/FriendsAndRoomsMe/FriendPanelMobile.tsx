import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import FriendBadgeLarge from "@/components/me/FriendsAndRoomsMe/FriendBadgeLarge";
import FriendBadgeLargeUser from "@/components/user/FriendsAndRoomsUser/FriendBadgeLargeUser";
import FriendBadgeMobile from "@/components/me/FriendsAndRoomsMe/FriendBadgeMobile";
import type { Friend } from "@/components/me/FriendsAndRoomsMe/friends";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@/components/ui/popover";

type FriendPanelMobileProps = {
  friends: Friend[];
  invitations: Friend[];
};

export default function FriendPanelMobile({
  friends,
  invitations,
}: FriendPanelMobileProps) {
  const hasInvitations = invitations.length > 0;
  const hasFriends = friends.length > 0;

  if (!hasInvitations && !hasFriends) {
    return null;
  }

  return (
    <Card className="w-full ring-0">
      {hasInvitations && (
        <>
          <CardHeader className="text-center">
            <CardTitle className="text-lg">Invitations</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Popover>
              <PopoverTrigger asChild>
                <button className="cursor-pointer">
                  <FriendBadgeMobile friends={invitations} />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-0">
                <PopoverHeader className="text-center py-3">
                  Invitations
                </PopoverHeader>
                <ScrollArea className="h-72">
                  <ul className="space-y-1 p-2">
                    {invitations.map((invitation) => (
                      <FriendBadgeLargeUser
                        key={invitation.id}
                        friend={invitation}
                      />
                    ))}
                  </ul>
                </ScrollArea>
              </PopoverContent>
            </Popover>
          </CardContent>
        </>
      )}

      {hasInvitations && hasFriends && <Separator />}

      {hasFriends && (
        <>
          <CardHeader className="text-center">
            <CardTitle className="text-lg">PearPals</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Popover>
              <PopoverTrigger asChild>
                <button className="cursor-pointer">
                  <FriendBadgeMobile friends={friends} />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-0">
                <PopoverHeader className="text-center py-3">
                  Friends and Rooms
                </PopoverHeader>
                <ScrollArea className="h-72">
                  <ul className="space-y-1 p-2">
                    {friends.map((friend) => (
                      <FriendBadgeLarge key={friend.id} friend={friend} />
                    ))}
                  </ul>
                </ScrollArea>
              </PopoverContent>
            </Popover>
          </CardContent>
        </>
      )}
    </Card>
  );
}
