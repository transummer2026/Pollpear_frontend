import { Info } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type VisibilitySwitchProps = {
  isPublic: boolean;
  setIsPublic: (checked: boolean) => void;
};

export default function VisibilitySwitch({
  isPublic,
  setIsPublic,
}: VisibilitySwitchProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Label>Public room</Label>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger type="button">
                <Info size={15} className="text-muted-foreground" />
              </TooltipTrigger>

              <TooltipContent>
                {isPublic
                  ? "Anyone can find and join this room"
                  : "Only invited people can join this room"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <Switch
          checked={isPublic}
          onCheckedChange={setIsPublic}
          className="data-checked:bg-[#325024]"
        />
      </div>

      <p className="text-sm text-muted-foreground">
        {isPublic ? "Visible by everyone" : "Invite only"}
      </p>
    </div>
  );
}
