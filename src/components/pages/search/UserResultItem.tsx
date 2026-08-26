import { Link } from "react-router";
import { HugeiconsIcon } from "@hugeicons/react";
import { UserIcon } from "@hugeicons/core-free-icons";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Item, ItemMedia, ItemContent, ItemTitle } from "@/components/ui/item";
import type { UserSearchResultDTO } from "@shared/schemas/search.schema";

export function UserResultItem({ user }: { user: UserSearchResultDTO }) {
  return (
    <Item asChild variant="outline">
      <Link to={`/users/${user.id}`}>
        <ItemMedia variant="image">
          <Avatar>
            <AvatarImage src={user.avatarUrl} alt={user.username} />
            <AvatarFallback>
              <HugeiconsIcon
                icon={UserIcon}
                strokeWidth={2}
                className="size-4"
              />
            </AvatarFallback>
          </Avatar>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>{user.username}</ItemTitle>
          {(user.name || user.surname) && (
            <span className="text-sm text-muted-foreground">
              {[user.name, user.surname].filter(Boolean).join(" ")}
            </span>
          )}
        </ItemContent>
      </Link>
    </Item>
  );
}
