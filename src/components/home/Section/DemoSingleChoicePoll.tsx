import { useState } from "react";
import { Vote } from "lucide-react";
import PollResult from "@/components/poll/pollResult/PollResult";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import DemoHashtags from "@/components/home/Section/DemoHashtags";
import { SINGLE_CHOICE_DEMO } from "@/components/home/Section/demos";

/**
 * The one demo on the landing page that answers back: voting flips it to its
 * results, counting the visitor's own click in. No account and no request
 * involved — the point is to show the loop, not to record anything.
 */
export default function DemoSingleChoicePoll() {
  const [votedOptionId, setVotedOptionId] = useState<number | null>(null);

  const options = SINGLE_CHOICE_DEMO.options.map((option) =>
    option.id === votedOptionId
      ? { ...option, votes: option.votes + 1 }
      : option,
  );
  const totalVotes = options.reduce((total, option) => total + option.votes, 0);

  if (votedOptionId === null)
    return (
      <Card
        size="sm"
        className="w-full self-start p-4 space-y-4 poll-card-raised ring-0"
      >
        <div className="flex items-center justify-between gap-2">
          <Badge variant="open">Open</Badge>
          <span className="text-sm text-muted-foreground">Single choice</span>
        </div>

        <h3 className="text-sm font-bold">{SINGLE_CHOICE_DEMO.title}</h3>

        <p className="text-sm text-muted-foreground">
          {SINGLE_CHOICE_DEMO.description}
        </p>

        <div className="space-y-2">
          {SINGLE_CHOICE_DEMO.options.map((option) => (
            <Button
              key={option.id}
              type="button"
              variant="outline"
              className="w-full justify-between h-12 hover:bg-muted"
              onClick={() => setVotedOptionId(option.id)}
            >
              <span>{option.text}</span>
            </Button>
          ))}
        </div>

        <DemoHashtags hashtags={SINGLE_CHOICE_DEMO.hashtags} />

        <p className="text-sm text-muted-foreground">
          Try it — this one is a demo, nothing is saved.
        </p>
      </Card>
    );

  return (
    <Card
      size="sm"
      className="w-full self-start p-4 space-y-3 poll-card-sunken ring-0"
    >
      <div className="flex items-center justify-between gap-2">
        <Badge variant="open">Open</Badge>
        <span className="text-sm text-muted-foreground">Single choice</span>
      </div>

      <h3 className="text-sm font-bold">{SINGLE_CHOICE_DEMO.title}</h3>

      <div className="space-y-3">
        {options.map((option) => (
          <PollResult
            key={option.id}
            answer={option}
            totalVotes={totalVotes}
            barClassName="bg-poll-bar-track poll-bar-single"
          />
        ))}
      </div>

      {/* mirrors PollUpdateVoteButton, the real card's way back to the ballot */}
      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={() => setVotedOptionId(null)}
      >
        Update your vote
      </Button>

      <div className="border-t pt-4 flex items-center gap-2 text-sm text-muted-foreground">
        <Vote size={16} />
        {totalVotes} votes
      </div>
    </Card>
  );
}
