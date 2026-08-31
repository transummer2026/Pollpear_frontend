import { Progress } from "@/components/ui/progress";

type PollResultProps = {
  answer: {
    id: number;
    text: string;
    votes: number;
  };
  totalVotes: number;
  barClassName?: string;
};

/** One option's share of the vote, as a labelled bar. */
export default function PollResult({
  answer,
  totalVotes,
  barClassName,
}: PollResultProps) {
  const percent =
    totalVotes > 0 ? Math.round((answer.votes / totalVotes) * 100) : 0;

  return (
    <div>
      <div className="flex justify-between mb-2">
        <span>{answer.text}</span>
        <span className="font-semibold">{percent}%</span>
      </div>

      <Progress value={percent} className={barClassName} />

      <p className="text-xs text-muted-foreground mt-1">{answer.votes} votes</p>
    </div>
  );
}
