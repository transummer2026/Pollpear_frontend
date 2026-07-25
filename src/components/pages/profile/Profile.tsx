import AvatarUser from "@/components/me/AtatarUser";
import HeaderUser from "@/components/me/Header/HeaderUser";
import MainContentUser from "@/components/me/MainContentUser";
import FriendPannelUser from "@/components/me/FriendsAndRooms/FriendPannelUser";
import Layout from "@/layout/Layout";

export default function Profile() {
  return (
    <Layout>
      <div className="hidden lg:block">
        <div className="grid grid-cols-1 lg:grid-cols-6 mx-auto max-w-7xl gap-4 p-4 ">
          <div className="lg:col-span-1 ">
            <AvatarUser />
          </div>
          <div className="lg:col-span-5">
            <HeaderUser />
          </div>
          <div className="lg:col-span-4 ">
            <MainContentUser />
          </div>
          <div className="lg:col-span-2 ">
            <FriendPannelUser />
          </div>
        </div>
      </div>

      <div className="lg:hidden">
        <div className="flex flex-col gap-4 p-4 justify-center items-center">
          <AvatarUser />
          <HeaderUser />
          <FriendPannelUser />
          <MainContentUser />
        </div>
      </div>
    </Layout>
  );
}
