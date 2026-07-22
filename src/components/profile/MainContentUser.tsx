import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PollDummy from "../poll/PollDummy";

const polls = [
    { id: 1, question: "Best chinese restaurant in town ?", createdAt: "2 hours ago", expiresIn: "in 3 days", isClosed: false, totalVotes: 120, hashtags: ["#42", "#Lausanne", "#foodie", "#chinese food"],
      answers: [
        { id: 1, label: "Kung-fu", votes: 78 },
        { id: 2, label: "Chez Yin", votes: 42 }
      ],
    },
    { id: 2, question: "Is Rust a good Path for PierEric ?", createdAt: "4 days ago", expiresIn: "in 0 days", isClosed: true, totalVotes: 965, hashtags: ["#42", "#Rust", "#PierEric", "#vibecoding"],
      answers: [
        { id: 1, label: "yes", votes: 260 },
        { id: 2, label: "no", votes: 705 }
      ],
    },
    { id: 3, question: "Vidy ou Ouchy ?", createdAt: "1 days ago", expiresIn: "in 1 days", isClosed: false, totalVotes: 100, hashtags: ["#plage", "#soleil", "#42"],
      answers: [
        { id: 1, label: "Vidy", votes: 60 },
        { id: 2, label: "Ouchy", votes: 40 }
      ],
    }
  ];

export default function MainContentUser() {
	return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Polls</CardTitle>
      </CardHeader>
      <CardContent className="gap-2 grid grid-cols-1 md:grid-cols-2">
      {polls.map((poll) => (
        <PollDummy key={poll.id} poll={poll} />
      ))}
      </CardContent>
    </Card>
  )
}
