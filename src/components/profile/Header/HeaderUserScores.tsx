import { ItemGroup } from "@/components/ui/item";
import HeaderUserScore from "./HeaderUserScore";

export default function HeaderUserScores({ scores }: { scores: any }) {
  const stats = [
    {
      label: "Score",
      value: scores.scores,
    },
    {
      label: "PearsPals",
      value: scores.friends,
    },
    {
      label: "Active Rooms",
      value: scores.rooms,
    },
    {
      label: "Polls Created",
      value: scores.pollsCreated,
    },
  ];

  return (
    <ItemGroup className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <HeaderUserScore key={stat.label} label={stat.label} value={stat.value} />
      ))}
    </ItemGroup>
  );
}
