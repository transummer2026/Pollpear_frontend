import { Progress } from "@/components/ui/progress";

type PollResultProps = {
  answer: {
    id: number;
    label: string;
    votes: number;
  };
  totalVotes: number;
};

export default function PollResult({ answer, totalVotes }: PollResultProps) {
  const percent = Math.round ( (answer.votes / totalVotes) * 100 );

  return (
    <div>
      <div className="flex justify-between mb-2">
        <span>{answer.label}</span>
        <span className="font-semibold">
          {percent}%
        </span>
      </div>

      <Progress value={percent} />

      <p className="text-xs text-muted-foreground mt-1">
        {answer.votes} votes
      </p>
    </div>
  );
}