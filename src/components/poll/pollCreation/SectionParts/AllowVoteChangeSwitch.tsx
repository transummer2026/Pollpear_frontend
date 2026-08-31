import { Info } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type AllowChangeVoteSwitchProps = {
  allowChangeVote: boolean;
  setAllowChangeVote: (checked: boolean) => void;
};

/**
 * Whether a voter may change their answer after seeing the results. Off means
 * the first vote is final — the setting is read at vote time, so flipping it
 * later applies to everyone at once.
 */
export default function AllowVoteChangeSwitch({
  allowChangeVote,
  setAllowChangeVote,
}: AllowChangeVoteSwitchProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Label>Allow vote change</Label>

        <Tooltip>
          <TooltipTrigger>
            <Info size={15} className="text-muted-foreground" />
          </TooltipTrigger>

          <TooltipContent>
            {allowChangeVote
              ? "The vote can be changed after viewing the results."
              : "Changing the vote is disabled after viewing the results."}
          </TooltipContent>
        </Tooltip>
      </div>

      <Switch
        checked={allowChangeVote}
        onCheckedChange={setAllowChangeVote}
        className="data-checked:bg-[#325024]"
      />
    </div>
  );
}
