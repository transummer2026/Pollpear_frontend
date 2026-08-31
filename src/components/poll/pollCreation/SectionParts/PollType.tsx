import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CircleDot, ListChecks } from "lucide-react";
import type { PollType } from "@shared/prisma/schemas/enums/PollType.schema";

type PollTypeProps = {
  type: Extract<PollType, "single_choice" | "multiple_choice">;
  setType: (
    type: Extract<PollType, "single_choice" | "multiple_choice">,
  ) => void;
};

export default function PollType({ type, setType }: PollTypeProps) {
  return (
    <div className="space-y-2 col-span-2">
      <Label>Poll type</Label>

      <div className="flex gap-2">
        <Button
          type="button"
          className={cn(
            "flex-1",
            type === "single_choice" &&
              "bg-[#6F8459] text-white hover:bg-[#6F8459]/90",
          )}
          variant={type === "single_choice" ? "default" : "outline"}
          onClick={() => setType("single_choice")}
        >
          <CircleDot size={16} />{" "}
          <span className="hidden sm:inline">Single</span>
        </Button>
        <Button
          type="button"
          className={cn(
            "flex-1",
            type === "multiple_choice" &&
              "bg-[#6F8459] text-white hover:bg-[#6F8459]/90",
          )}
          variant={type === "multiple_choice" ? "default" : "outline"}
          onClick={() => setType("multiple_choice")}
        >
          <ListChecks size={16} />{" "}
          <span className="hidden sm:inline">Multiple</span>
        </Button>
      </div>
    </div>
  );
}
