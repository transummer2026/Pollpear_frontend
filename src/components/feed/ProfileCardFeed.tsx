import { Link } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { useMe } from "@/hooks/user/use-me";

/** The viewer's own card at the top of the feed sidebar, linking to their profile. */
export default function ProfileCardFeed() {
  const { data: user } = useMe();

  if (!user) return null;

  return (
    <Card size="sm" className="ring-0">
      <CardContent>
        <Link
          to="/me"
          className="
            flex
            items-center
            gap-3
            rounded-lg
            p-2
            transition-colors
            hover:bg-muted
          "
        >
          <Avatar className="h-14 w-14 shrink-0 border-2">
            <AvatarImage src={user.avatarUrl} alt={user.username} />

            <AvatarFallback>
              {user.username.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <p className="min-w-0 flex-1 truncate text-lg font-semibold">
            {user.username}
          </p>
        </Link>
      </CardContent>
    </Card>
  );
}
