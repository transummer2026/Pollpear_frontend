import { Vote } from "lucide-react";
import PollResult from "@/components/poll/pollResult/PollResult";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import DemoHashtags from "@/components/home/Section/DemoHashtags";
import { MULTIPLE_CHOICE_DEMO } from "@/components/home/Section/demos";

/** A closed multiple-choice poll, shown as results — its shares add up past 100%. */
export default function DemoMultipleChoicePoll() {
  const totalVotes = MULTIPLE_CHOICE_DEMO.options.reduce(
    (total, option) => total + option.votes,
    0,
  );

  return (
    <Card
      size="sm"
      className="w-full self-start p-4 space-y-3 poll-card-sunken ring-0"
    >
      <div className="flex items-center justify-between gap-2">
        <Badge variant="closed">Closed</Badge>
        <span className="text-xs text-muted-foreground">Multiple choice</span>
      </div>

      <h3 className="text-sm font-bold">{MULTIPLE_CHOICE_DEMO.title}</h3>

      <div className="space-y-3">
        {MULTIPLE_CHOICE_DEMO.options.map((option) => (
          <PollResult
            key={option.id}
            answer={option}
            totalVotes={totalVotes}
            barClassName="bg-poll-bar-track poll-bar-multi"
          />
        ))}
      </div>

      <DemoHashtags hashtags={MULTIPLE_CHOICE_DEMO.hashtags} />

      <div className="border-t pt-4 flex items-center gap-2 text-sm text-muted-foreground">
        <Vote size={16} />
        {totalVotes} votes
      </div>
    </Card>
  );
}
