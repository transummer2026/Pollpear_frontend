import FriendPanelDesktopUser from "@/components/user/FriendsAndRoomsUser/FriendPanelDesktopUser";
import FriendPanelMobileUser from "@/components/user/FriendsAndRoomsUser/FriendPanelMobileUser";

type FriendPannelUserProps = {
  id: number;
};

/**
 * The friends panel in its two layouts — a paginated card on desktop, a row of
 * avatars opening a sheet on mobile. Both are mounted and CSS picks one; they
 * differ enough in structure that a single responsive markup would be worse.
 */
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
