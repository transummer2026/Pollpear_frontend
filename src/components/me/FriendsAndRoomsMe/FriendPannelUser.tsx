import FriendPanelDesktop from "@/components/me/FriendsAndRoomsMe/FriendPanelDesktop";
import FriendPanelMobile from "@/components/me/FriendsAndRoomsMe/FriendPanelMobile";
import RoomSection from "@/components/me/FriendsAndRoomsMe/RoomSection";
import RoomInvitationSection from "@/components/me/FriendsAndRoomsMe/RoomInvitationSection";
import {
  sortByStatus,
  toFriend,
} from "@/components/me/FriendsAndRoomsMe/friends";
import { useAuth } from "@/hooks/auth/use-auth";
import { useFriendRequests, useFriends } from "@/hooks/friend/use-friendship";

/**
 * The whole right-hand column of one's own profile: friends, friend requests,
 * room invitations and rooms. The friend data is fetched once here and handed
 * down, so the desktop and mobile panels never fetch it twice.
 */
export default function FriendPannelUser() {
  const { data: me } = useAuth();
  const { data } = useFriends(me?.id);
  const { data: requestsData } = useFriendRequests(me?.id);
  const sortedFriends = sortByStatus((data ?? []).map(toFriend));
  const invitations = (requestsData ?? []).map(toFriend);

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="hidden lg:block">
        <FriendPanelDesktop friends={sortedFriends} invitations={invitations} />
      </div>
      <div className="w-full lg:hidden">
        <FriendPanelMobile friends={sortedFriends} invitations={invitations} />
      </div>
      <RoomInvitationSection />
      {/* on mobile the rooms live as a row of the panel above */}
      <div className="hidden lg:block">
        <RoomSection />
      </div>
    </div>
  );
}
