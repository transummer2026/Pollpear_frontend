import FriendPanelDesktopUser from "@/components/user/FriendsAndRoomsUser/FriendPanelDesktopUser";
import FriendPanelMobileUser from "@/components/user/FriendsAndRoomsUser/FriendPanelMobileUser";

type FriendPannelUserProps = {
  id: number;
};

export default function FriendPannelUser({ id }: FriendPannelUserProps) {
  return (
    <>
      <div className="hidden lg:block">
        <FriendPanelDesktopUser id={id} />
      </div>
      <div className="w-full lg:hidden">
        <FriendPanelMobileUser id={id} />
      </div>
    </>
  );
}
