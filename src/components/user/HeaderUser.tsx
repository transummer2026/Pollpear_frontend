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
    <Card className="ring-0 lg:min-h-40 lg:max-h-64 lg:[--card-spacing:--spacing(4)]">
      <CardHeader className="space-y-2">
        {/*
          Stacks as username / bio / buttons on mobile, the DOM order. From md
          the grid lifts the buttons back up beside the username. Mirrors
          HeaderMe's read-only state, minus the edit affordances.
        */}
        <div className="grid gap-2 grid-cols-[minmax(0,1fr)] md:grid-cols-[minmax(0,1fr)_auto]">
          <CardTitle className="min-w-0 truncate text-2xl font-bold md:col-start-1 md:row-start-1">
            {user?.username}
          </CardTitle>

          <CardDescription className="wrap-anywhere md:col-start-1 md:row-start-2">
            {user?.bio}
          </CardDescription>

          <div className="flex gap-2 md:col-start-2 md:row-start-1 md:justify-self-end">
            <FriendshipButton userId={id} />
            <BlockButton userId={id} />
          </div>
        </div>
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
