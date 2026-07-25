import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router";
import HeaderUserHashtags from "./HeaderUserHashtags";
import HeaderUserScores from "./HeaderUserScores";
import { useMe } from "@/hooks/user/use-me";
import { toast } from "sonner";
import { ApiError } from "@/lib/fetcher";

export default function HeaderUser() {
  const { data: user, error } = useMe();

  if (error) {
    if (error instanceof ApiError) toast.error(error.message);
    else toast.error("Error fetching user data");
  }
  const hashtags = {
    hashtags: ["#polls", "#crocs", "#Valais", "#vibeconding", "#claude"],
  };

  return (
    <Card>
      <CardHeader className="space-y-2">
        <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
          <CardTitle className="text-lg font-bold">{user?.username}</CardTitle>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link to="/settings">Settings</Link>
            </Button>
            <Button variant="outline">Edit Profile</Button>
          </div>
        </div>
        <CardDescription>{user?.bio}</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="space-y-2 grid grid-cols-1 lg:grid-cols-5 mx-auto max-w-7xl gap-4 p-4">
        <div className="lg:col-span-4 md:col-span-2">
          <HeaderUserScores scores={user?.score} />
        </div>
        <div className="space-y-3 lg:col-span-1">
          <HeaderUserHashtags hashtags={hashtags.hashtags} />
        </div>
      </CardContent>
    </Card>
  );
}
