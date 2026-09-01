import { HugeiconsIcon } from "@hugeicons/react";
import { UserIcon } from "@hugeicons/core-free-icons";
import { CommandGroup, CommandItem } from "@/components/ui/command";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import type { UserSearchResultDTO } from "@shared/schemas/search.schema";

type UserSearchGroupProps = {
  users: UserSearchResultDTO[];
  onSelect: (userId: number) => void;
};

/**
 * The users section of the search dialog. Renders nothing when empty, so the
 * heading never stands over an empty list.
 */
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
          {user.username}
        </CommandItem>
      ))}
    </CommandGroup>
  );
}
