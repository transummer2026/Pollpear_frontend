import { ItemGroup } from "@/components/ui/item";
import HeaderUserScore from "./HeaderMeScore";

export default function HeaderMeScores({ score }: { score?: number | null }) {
  const stats = [
    {
      label: "Score",
      value: score ?? undefined,
    },
    {
      label: "PearsPals",
      value: undefined,
    },
    {
      label: "Active Rooms",
      value: undefined,
    },
    {
      label: "Polls Created",
      value: undefined,
    },
  ];

  return (
    <ItemGroup className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <HeaderUserScore
          key={stat.label}
          label={stat.label}
          value={stat.value}
        />
      ))}
    </ItemGroup>
  );
}
