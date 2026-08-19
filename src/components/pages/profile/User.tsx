import AvatarUser from "@/components/user/AvatarUser";
import HeaderUser from "@/components/user/HeaderUser";
import MainContentUser from "@/components/user/MainContentUser";
import FriendPannelUser from "@/components/user/FriendsAndRoomsUser/FriendPannelUser";
import Layout from "@/layout/Layout";

type UserProps = {
  id?: number;
};

export default function User({ id }: UserProps) {
  if (!id) {
    return (
      <Layout>
        <div className="p-4 text-center">User not found</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="hidden lg:block">
        <div className="grid grid-cols-1 lg:grid-cols-6 mx-auto max-w-7xl gap-4 p-4 ">
          <div className="lg:col-span-1 ">
            <AvatarUser id={id} />
          </div>
          <div className="lg:col-span-5">
            <HeaderUser id={id} />
          </div>
          <div className="lg:col-span-4 ">
            <MainContentUser id={id} />
          </div>
          <div className="lg:col-span-2 ">
            <FriendPannelUser id={id} />
          </div>
        </div>
      </div>

      <div className="lg:hidden">
        <div className="flex flex-col gap-4 p-4 justify-center items-center">
          <AvatarUser id={id} />
          <HeaderUser id={id} />
          <FriendPannelUser id={id} />
          <MainContentUser id={id} />
        </div>
      </div>
    </Layout>
  );
}
