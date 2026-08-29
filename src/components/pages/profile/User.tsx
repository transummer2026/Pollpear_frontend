import AvatarUser from "@/components/user/AvatarUser";
import HeaderUser from "@/components/user/HeaderUser";
import MainContentUser from "@/components/user/MainContentUser";
import FriendPannelUser from "@/components/user/FriendsAndRoomsUser/FriendPannelUser";
import Layout from "@/layout/Layout";
import NotFound from "@/components/pages/error/NotFound";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@/hooks/user/use-user";

type UserProps = {
  id?: number;
};

export default function User({ id }: UserProps) {
  const { data: user, error, isLoading } = useUser(id);

  if (!id) {
    return <NotFound title="User not found" />;
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="grid grid-cols-1 lg:grid-cols-4 mx-auto max-w-7xl gap-4 p-4">
          <Skeleton className="h-40 lg:col-span-1" />
          <Skeleton className="h-40 lg:col-span-3" />
        </div>
      </Layout>
    );
  }

  if (error || !user) {
    return <NotFound title="User not found" />;
  }

  return (
    <Layout>
      <div className="hidden lg:block">
        <div className="grid grid-cols-1 lg:grid-cols-4 mx-auto max-w-7xl gap-4 p-4 ">
          <div className="lg:col-span-1 flex items-center justify-center">
            <AvatarUser id={id} />
          </div>
          <div className="lg:col-span-3">
            <HeaderUser id={id} />
          </div>
          <div className="lg:col-span-3 ">
            <MainContentUser id={id} />
          </div>
          <div className="lg:col-span-1 ">
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
