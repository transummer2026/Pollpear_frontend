import AvatarMe from "@/components/me/AvatarMe";
import HeaderMe from "@/components/me/Header/HeaderMe";
import MainContentMe from "@/components/me/MainContentMe";
import FriendPannelMe from "@/components/me/FriendsAndRoomsMe/FriendPannelUser";
import Layout from "@/layout/Layout";

export default function Me() {
  return (
    <Layout>
      <div className="hidden lg:block">
        <div className="grid grid-cols-1 lg:grid-cols-6 mx-auto max-w-7xl gap-4 p-4 ">
          <div className="lg:col-span-1 ">
            <AvatarMe />
          </div>
          <div className="lg:col-span-5">
            <HeaderMe />
          </div>
          <div className="lg:col-span-4 ">
            <MainContentMe />
          </div>
          <div className="lg:col-span-2 ">
            <FriendPannelMe />
          </div>
        </div>
      </div>

      <div className="lg:hidden">
        <div className="flex flex-col gap-4 p-4 justify-center items-center">
          <AvatarMe />
          <HeaderMe />
          <FriendPannelMe />
          <MainContentMe />
        </div>
      </div>
    </Layout>
  );
}
