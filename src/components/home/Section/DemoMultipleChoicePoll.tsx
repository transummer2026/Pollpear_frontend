import { Vote } from "lucide-react";
import PollResult from "@/components/poll/pollResult/PollResult";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import DemoHashtags from "@/components/home/Section/DemoHashtags";
import { BRAND } from "@/components/home/Section/brand";
import { MULTIPLE_CHOICE_DEMO } from "@/components/home/Section/demos";

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
        <Badge className={BRAND.closedBadge}>Closed</Badge>
        <span className={`text-xs ${BRAND.sageText}`}>Multiple choice</span>
      </div>

      <h3 className={`text-sm font-bold ${BRAND.greenText}`}>
        {MULTIPLE_CHOICE_DEMO.title}
      </h3>

      <div className="space-y-3">
        {MULTIPLE_CHOICE_DEMO.options.map((option) => (
          <div key={option.id} className="p-2">
            <PollResult answer={option} totalVotes={totalVotes} />
          </div>
        ))}
      </div>

      <DemoHashtags hashtags={MULTIPLE_CHOICE_DEMO.hashtags} />

      <div
        className={`pt-4 flex items-center gap-2 text-sm ${BRAND.sageText} ${BRAND.sectionBorder}`}
      >
        <Vote size={16} />
        {totalVotes} votes
      </div>
    </Card>
  );
}
