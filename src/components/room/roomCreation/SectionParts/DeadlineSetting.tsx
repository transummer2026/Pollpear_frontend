import { Info } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const MIN_DAYS = 1;
const MAX_DAYS = 365;

type DeadlineSettingProps = {
  hasDeadline: boolean;
  setHasDeadline: (checked: boolean) => void;
  days: number;
  initialDays: number;
  setDays: (days: number) => void;
};

export default function DeadlineSetting({
  hasDeadline,
  setHasDeadline,
  days,
  initialDays,
  setDays,
}: DeadlineSettingProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Label>Deadline</Label>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger type="button">
                <Info size={15} className="text-muted-foreground" />
              </TooltipTrigger>

              <TooltipContent>
                {hasDeadline
                  ? "The room will close automatically"
                  : "The room will stay open"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <Switch checked={hasDeadline} onCheckedChange={setHasDeadline} />
      </div>

      {hasDeadline && (
        <div className="space-y-2">
          <Label>Ends in</Label>

          <div className="flex items-center gap-3">
            <Input
              type="number"
              min={MIN_DAYS}
              max={MAX_DAYS}
              className="w-28"
              value={days}
              onChange={(e) => {
                const value = Number(e.target.value);

                if (value >= MIN_DAYS && value <= MAX_DAYS) {
                  setDays(value);
                } else if (e.target.value !== "") {
                  setDays(initialDays);
                }
              }}
            />

            <span className="text-sm text-muted-foreground">days</span>
          </div>
        </div>
      )}
    </div>
  );
}
