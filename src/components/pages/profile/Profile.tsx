import AvatarUser from "@/components/profile/AtatarUser";
import HeaderUser from "@/components/profile/HeaderUser";
import SettingPannelUser from "@/components/profile/SettingPannelUser";
import MainContentUser from "@/components/profile/MainContentUser";
import FriendPannelUser from "@/components/profile/FriendPannelUser";
import Layout from "@/layout/Layout";

export default function Profile() {
  return (
    <Layout>
        <div className="grid grid-cols-1 lg:grid-cols-6 mx-auto  max-w-7xl  gap-4 p-4 ">
          
          <div className="lg:col-span-1 p-4 w-full flex justify-center">
            <AvatarUser />
          </div>

          <div className="lg:col-span-3">
            <HeaderUser />
          </div>

          <div className="lg:col-span-2">
            <SettingPannelUser />
          </div>

          <div className="lg:col-span-4 ">
            <MainContentUser />
          </div>

          <div className="lg:col-span-2 ">
            <FriendPannelUser />
          </div>

        </div>
    </Layout>
  );
}