import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PollDummy from "@/components/poll/PollDummy";

// TODO: remplacer par les vraies polls du user (GET /polls?userId=...)
// afficher ceux qui sont pas anonyme et en cours. genre 6 max ? -> coté vote pas result (inverse de me)

//eslint-disable-next-line @typescript-eslint/no-unused-vars
function pollsOfUser(_userId: number) {
  return [
    {
      id: 1,
      question: "Best chinese restaurant in town ?",
      createdAt: "2 hours ago",
      expiresIn: "in 3 days",
      isClosed: false,
      totalVotes: 120,
      hashtags: ["#42", "#Lausanne", "#foodie", "#chinese food"],
      answers: [
        { id: 1, label: "Kung-fu", votes: 78 },
        { id: 2, label: "Chez Yin", votes: 42 },
      ],
    },
  ];
}

type MainContentUserProps = {
  id: number;
};

export default function MainContentUser({ id }: MainContentUserProps) {
  const polls = pollsOfUser(id);

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
  );
}
