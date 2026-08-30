import PollCard from "@/components/poll/PollCard";
import type { PollReadDTO } from "@shared/schemas/polls.schema";

type FeedPollSectionProps = {
  polls: PollReadDTO[];
  emptyLabel: string;
};

export default function FeedPollSection({
  polls,
  emptyLabel,
}: FeedPollSectionProps) {
  if (polls.length === 0) {
    return <p className="text-sm text-muted-foreground">{emptyLabel}</p>;
  }

  return (
    <div className="columns-1 md:columns-2 xl:columns-3 gap-5">
      {polls.map((poll) => (
        <div key={poll.id} className="mb-5 break-inside-avoid">
          <PollCard poll={poll} />
        </div>
      ))}
    </div>
  );
}
