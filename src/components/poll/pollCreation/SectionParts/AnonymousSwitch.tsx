import { Info } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type AnonymousSwitchProps = {
  anonymous: boolean;
  setAnonymous: (checked: boolean) => void;
};

export default function AnonymousSwitch({
  anonymous,
  setAnonymous,
}: AnonymousSwitchProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Label>Anonymous</Label>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info size={15} className="text-muted-foreground" />
            </TooltipTrigger>

            <TooltipContent>
              {anonymous
                ? "The creator name will be visible"
                : "The creator name will be hidden"}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <Switch checked={anonymous} onCheckedChange={setAnonymous} />
    </div>
  );
}
