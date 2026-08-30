import { Vote } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { BRAND } from "@/components/home/Section/brand";
import { SLIDER_DEMO } from "@/components/home/Section/demos";

export default function DemoSliderPoll() {
  return (
    <Card
      size="sm"
      className="w-full self-start p-4 space-y-4 poll-card-raised ring-0"
    >
      <div className="flex items-center justify-between gap-2">
        <Badge className={BRAND.openBadge}>Open</Badge>
        <span className={`text-xs ${BRAND.sageText}`}>Slider</span>
      </div>

      <h3 className={`text-sm font-bold ${BRAND.greenText}`}>
        {SLIDER_DEMO.title}
      </h3>

      <div className="space-y-6 py-4">
        <div className={`text-center text-2xl font-bold ${BRAND.greenText}`}>
          {SLIDER_DEMO.average}%
        </div>

        <div className="space-y-2">
          <Slider
            value={[SLIDER_DEMO.average]}
            min={0}
            max={100}
            step={5}
            disabled
          />

          <div
            className={`flex justify-between gap-4 text-xs ${BRAND.sageText}`}
          >
            <span className="max-w-[45%] text-left">
              {SLIDER_DEMO.leftLabel}
            </span>
            <span className="max-w-[45%] text-right">
              {SLIDER_DEMO.rightLabel}
            </span>
          </div>
        </div>
      </div>

      <div
        className={`pt-4 flex items-center gap-2 text-sm ${BRAND.sageText} ${BRAND.sectionBorder}`}
      >
        <Vote size={16} />
        Average of {SLIDER_DEMO.voters} answers
      </div>
    </Card>
  );
}
