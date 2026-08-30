import { useState } from "react";
import { Vote } from "lucide-react";
import PollResult from "@/components/poll/pollResult/PollResult";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import DemoHashtags from "@/components/home/Section/DemoHashtags";
import { BRAND } from "@/components/home/Section/brand";
import { SINGLE_CHOICE_DEMO } from "@/components/home/Section/demos";

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
          <Badge className={BRAND.openBadge}>Open</Badge>
          <span className={`text-xs ${BRAND.sageText}`}>Single choice</span>
        </div>

        <h3 className={`text-sm font-bold ${BRAND.greenText}`}>
          {SINGLE_CHOICE_DEMO.title}
        </h3>

        <p className="text-sm text-muted-foreground">
          {SINGLE_CHOICE_DEMO.description}
        </p>

        <div className="space-y-2">
          {SINGLE_CHOICE_DEMO.options.map((option) => (
            <Button
              key={option.id}
              type="button"
              variant="outline"
              className="w-full justify-between h-12 border-[#6F8459]/40 hover:border-[#6F8459] hover:bg-[#D4E7CB]/50 dark:hover:bg-[#3A4336]"
              onClick={() => setVotedOptionId(option.id)}
            >
              <span>{option.text}</span>
            </Button>
          ))}
        </div>

        <DemoHashtags hashtags={SINGLE_CHOICE_DEMO.hashtags} />

        <p className="text-xs text-[#F67373]">
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
        <Badge className={BRAND.openBadge}>Open</Badge>
        <span className={`text-xs ${BRAND.sageText}`}>Single choice</span>
      </div>

      <h3 className={`text-sm font-bold ${BRAND.greenText}`}>
        {SINGLE_CHOICE_DEMO.title}
      </h3>

      <div className="space-y-3">
        {options.map((option) => (
          <div key={option.id} className="p-2">
            <PollResult answer={option} totalVotes={totalVotes} />
          </div>
        ))}
      </div>

      <div
        className={`pt-4 flex items-center justify-between gap-2 text-sm ${BRAND.sageText} ${BRAND.sectionBorder}`}
      >
        <span className="flex items-center gap-2">
          <Vote size={16} />
          {totalVotes} votes
        </span>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          className={`${BRAND.wineText} hover:bg-[#FFE0E0]/60 hover:text-[#885053] dark:hover:bg-[#885053]/25 dark:hover:text-[#FFE0E0]`}
          onClick={() => setVotedOptionId(null)}
        >
          Change my vote
        </Button>
      </div>
    </Card>
  );
}
