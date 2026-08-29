import { ItemGroup } from "@/components/ui/item";
import HeaderUserScore from "@/components/user/HeaderUserScore";
import { useUser } from "@/hooks/user/use-user";

type HeaderUserScoresProps = {
  id: number;
};

export default function HeaderUserScores({ id }: HeaderUserScoresProps) {
  const { data: user } = useUser(id);

  //TODO: brancher PearsPals / Active Rooms / Polls Created sur les vraies donnees du user
  const stats = [
    {
      label: "Score",
      value: user?.score ?? undefined,
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
    <ItemGroup className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
