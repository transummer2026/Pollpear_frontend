import { Vote } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { SLIDER_DEMO } from "@/components/home/Section/demos";

/** A slider poll at rest: the average answer, on a slider nobody can move. */
export default function DemoSliderPoll() {
  return (
    <Card
      size="sm"
      className="w-full self-start p-4 space-y-4 poll-card-raised ring-0"
    >
      <div className="flex items-center justify-between gap-2">
        <Badge variant="open">Open</Badge>
        <span className="text-xs text-muted-foreground">Slider</span>
      </div>

      <h3 className="text-sm font-bold">{SLIDER_DEMO.title}</h3>

      <div className="space-y-6 py-4">
        <div className="text-center text-2xl font-bold">
          {SLIDER_DEMO.average}%
        </div>

        <div className="space-y-2">
          <Slider
            value={[SLIDER_DEMO.average]}
            min={0}
            max={100}
            step={5}
            disabled
            className="poll-bar-slider"
          />

          <div className="flex justify-between gap-4 text-xs text-muted-foreground">
            <span className="max-w-[45%] text-left">
              {SLIDER_DEMO.leftLabel}
            </span>
            <span className="max-w-[45%] text-right">
              {SLIDER_DEMO.rightLabel}
            </span>
          </div>
        </div>
      </div>

      <div className="border-t pt-4 flex items-center gap-2 text-sm text-muted-foreground">
        <Vote size={16} />
        Average of {SLIDER_DEMO.voters} answers
      </div>
    </Card>
  );
}
