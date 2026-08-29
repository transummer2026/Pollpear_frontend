import { HugeiconsIcon } from "@hugeicons/react";
import { UserIcon } from "@hugeicons/core-free-icons";
import { CommandGroup, CommandItem } from "@/components/ui/command";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { resolveAvatarUrl } from "@/lib/avatar";
import type { UserSearchResultDTO } from "@shared/schemas/search.schema";

type UserSearchGroupProps = {
  users: UserSearchResultDTO[];
  onSelect: (userId: number) => void;
};

export function UserSearchGroup({ users, onSelect }: UserSearchGroupProps) {
  if (users.length === 0) return null;

  return (
    <CommandGroup heading="Users">
      {users.map((user) => (
        <CommandItem
          key={user.id}
          value={`user-${user.id}`}
          onSelect={() => onSelect(user.id)}
        >
          <Avatar size="sm">
            <AvatarImage
              src={resolveAvatarUrl(user.avatarUrl, user.name ?? user.username)}
              alt={user.username}
            />
            <AvatarFallback>
              <HugeiconsIcon
                icon={UserIcon}
                strokeWidth={2}
                className="size-3"
              />
            </AvatarFallback>
          </Avatar>
          {user.username}
        </CommandItem>
      ))}
    </CommandGroup>
  );
}
