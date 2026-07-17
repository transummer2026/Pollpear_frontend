import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash, Clock3, Vote } from "lucide-react";
import PollResult from "@/components/poll/PollResult";


type PollDummyProps = {
  poll: any;
};

export default function PollDummy({ poll }: PollDummyProps) {
  const totalVotes = poll.answers.reduce(
    (sum: number, answer: any) => sum + answer.votes,
    0
  );

  return (
    <Card size="sm" className="mx-auto p-4 space-y-3">
      <div className="flex justify-between items-center">
        <Badge variant={poll.isClosed ? "destructive" : "default"}>
          {poll.isClosed ? "Closed" : "Open"}
        </Badge>

        <div className="flex gap-2">
          <Badge variant="secondary" className="cursor-pointer">
            <Pencil />
          </Badge>

          <Badge variant="destructive" className="cursor-pointer">
            <Trash />
          </Badge>
        </div>
      </div>

      <h2 className="text-sm font-bold">{poll.question}</h2>

      <div className="flex flex-wrap gap-2">
        {poll.hashtags.map((tag: string) => (
          <Badge key={tag} variant="outline">
            {tag}
          </Badge>
        ))}
      </div>

      <div className="space-y-3">
        {poll.answers.map((answer: any) => (
          <PollResult
            key={answer.id}
            answer={answer}
            totalVotes={totalVotes}
          />
        ))}
      </div>

      <div className="border-t pt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Vote size={16} />
          {poll.totalVotes} votes
        </div>

        <div className="flex items-center gap-2">
          <Clock3 size={16} />
          {poll.createdAt}
        </div>

        <div>Expires {poll.expiresIn}</div>
      </div>
    </Card>
  );
}



//const [showResults, setShowResults] = useState(false);

// <Button
//   className="w-full"
//   variant="secondary"
//   onClick={() => setShowResults(!showResults)}
// >
//   {showResults
//     ? "Masquer les résultats"
//     : "Afficher les résultats"}
// </Button>


// {!showResults ? (
//         <div className="space-y-3">
//           {poll.answers.map((answer) => (
//             <Button
//               key={answer.id}
//               variant="outline"
//               className="w-full justify-start"
//             >
//               {answer.label}
//             </Button>
//           ))}
//         </div>
//       ) : (
//         <div className="space-y-5">
//           {poll.answers.map((answer) => {
//             const percent = Math.round(
//               (answer.votes / totalVotes) * 100
//             );
//             return (
//               <div key={answer.id}>
//                 <div className="flex justify-between mb-2">
//                   <span>{answer.label}</span>

//                   <span className="font-semibold">
//                     {percent}%
//                   </span>
//                 </div>

//                 <Progress value={percent} />

//                 <p className="text-xs text-muted-foreground mt-1">
//                   {answer.votes} votes
//                 </p>
//               </div>
//             );
//           })}
//         </div>