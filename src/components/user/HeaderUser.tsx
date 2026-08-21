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
    <Card className="lg:min-h-40 lg:max-h-50 lg:[--card-spacing:--spacing(4)]">
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
      <CardContent className="grid grid-cols-1 gap-4 lg:grid-cols-5 lg:min-h-0 lg:flex-1 lg:overflow-y-auto">
        <div className="lg:col-span-4 md:col-span-2">
          <HeaderUserScores id={id} />
        </div>
      </CardContent>
    </Card>
  );
}
