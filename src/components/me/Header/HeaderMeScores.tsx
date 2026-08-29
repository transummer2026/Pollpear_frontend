import { ItemGroup } from "@/components/ui/item";
import HeaderUserScore from "./HeaderMeScore";

export default function HeaderMeScores({ score }: { score?: number | null }) {
  const stats = [
    {
      label: "Score",
      value: score ?? undefined,
      className: "bg-[#6F8459] text-white",
    },
    {
      label: "PearsPals",
      value: undefined,
      className: "bg-[#D4E7CB] text-black",
    },
    {
      label: "Active Rooms",
      value: undefined,
      className: "bg-[#885053] text-white",
    },
    {
      label: "Polls Created",
      value: undefined,
      className: "bg-[#325024] text-white",
    },
  ];

  return (
    <ItemGroup className="grid grid-cols-2 md:grid-cols-4 gap-2">
      {stats.map((stat) => (
        <HeaderUserScore
          key={stat.label}
          label={stat.label}
          value={stat.value}
          className={stat.className}
        />
      ))}
    </ItemGroup>
  );
}
