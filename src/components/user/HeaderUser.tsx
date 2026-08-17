import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import HeaderUserScores from "@/components/user/HeaderUserScores";
import FriendshipButton from "@/components/user/FriendshipButton";
import BlockButton from "@/components/user/BlockButton";
import { useUser } from "@/hooks/user/use-user";

type HeaderUserProps = {
  id: number;
};

export default function HeaderUser({ id }: HeaderUserProps) {
  const { data: user } = useUser(id);

  return (
    <Card>
      <CardHeader className="space-y-2">
        <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
          <CardTitle className="text-lg font-bold">{user?.username}</CardTitle>
          <div className="flex gap-2">
            <FriendshipButton userId={id} />
            <BlockButton userId={id} />
          </div>
        </div>
        <CardDescription>{user?.bio}</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="space-y-2 grid grid-cols-1 lg:grid-cols-5 mx-auto max-w-7xl gap-4 p-4">
        <div className="lg:col-span-4 md:col-span-2">
          <HeaderUserScores id={id} />
        </div>
      </CardContent>
    </Card>
  );
}
