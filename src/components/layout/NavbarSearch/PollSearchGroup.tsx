import { HugeiconsIcon } from "@hugeicons/react";
import { Chart01Icon } from "@hugeicons/core-free-icons";
import { CommandGroup, CommandItem } from "@/components/ui/command";
import type { PollSearchResultDTO } from "@shared/schemas/search.schema";

type PollSearchGroupProps = {
  polls: PollSearchResultDTO[];
};

export function PollSearchGroup({ polls }: PollSearchGroupProps) {
  if (polls.length === 0) return null;

  return (
    <CommandGroup heading="Polls">
      {polls.map((poll) => (
        // No poll detail route yet: item is listed but not navigable.
        <CommandItem key={poll.id} value={`poll-${poll.id}`}>
          <HugeiconsIcon
            icon={Chart01Icon}
            strokeWidth={2}
            className="size-4 opacity-70"
          />
          {poll.title}
        </CommandItem>
      ))}
    </CommandGroup>
  );
}
