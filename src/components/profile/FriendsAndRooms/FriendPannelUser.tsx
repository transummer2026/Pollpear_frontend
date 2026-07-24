import FriendPanelDesktop from "@/components/profile/FriendsAndRooms/FriendPanelDesktop";
import FriendPanelMobile from "@/components/profile/FriendsAndRooms/FriendPanelMobile";
import {
  sortByStatus,
  type Friend,
} from "@/components/profile/FriendsAndRooms/friends";

// TODO: remplacer par les vraies données du user (API)
const friends: Friend[] = [
  { name: "Benedicte", status: "online", id: 40 },
  { name: "José", status: "online", id: 41 },
  { name: "Miguel", status: "offline", id: 42 },
  { name: "Jimmy", status: "online", id: 43 },
  { name: "Angela", status: "online", id: 44 },
  { name: "Poupou", status: "online", id: 45 },
  { name: "Ayka", status: "offline", id: 46 },
  { name: "Vincent", status: "offline", id: 47 },
  { name: "Eduardo", status: "online", id: 48 },
  { name: "Raffael", status: "offline", id: 49 },
];

export default function FriendPannelUser() {
  const sortedFriends = sortByStatus(friends);

  return (
    <>
      <div className="hidden lg:block">
        <FriendPanelDesktop friends={sortedFriends} />
      </div>
      <div className="w-full lg:hidden">
        <FriendPanelMobile friends={sortedFriends} />
      </div>
    </>
  );
}
