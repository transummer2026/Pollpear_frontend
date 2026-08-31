import { ItemGroup } from "@/components/ui/item";
import HeaderUserScore from "@/components/user/HeaderUserScore";
import { useUserScores } from "@/hooks/user/use-user-scores";

type HeaderUserScoresProps = {
  /** Optional: the profile owner isn't known until `/me` (or `/users/:id`)
   * has answered, and the tiles render at 0 in the meantime. */
  id?: number;
};

export default function HeaderUserScores({ id }: HeaderUserScoresProps) {
  const { score, pearsPals, activeRooms, pollsCreated } = useUserScores(id);

  const stats = [
    {
      label: "Score",
      value: score,
      className: "bg-[#6F8459] text-white",
    },
    {
      label: "PearsPals",
      value: pearsPals,
      className: "bg-[#D4E7CB] text-black",
    },
    {
      label: "Active Rooms",
      value: activeRooms,
      className: "bg-[#885053] text-white",
    },
    {
      label: "Polls Created",
      value: pollsCreated,
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
