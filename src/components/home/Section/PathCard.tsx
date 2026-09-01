import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BRAND } from "@/components/home/Section/brand";

type PathCardProps = {
  icon: ReactNode;
  badge: string;
  title: string;
  intro: string;
  steps: string[];
  tone: "green" | "warm";
};

export default function PathCard({
  icon,
  badge,
  title,
  intro,
  steps,
  tone,
}: PathCardProps) {
  const isWarm = tone === "warm";

  return (
    <Card size="sm" className={`p-4 space-y-4 ${BRAND.softBorder}`}>
      <div className="flex items-center gap-2">
        <span className={isWarm ? BRAND.wineText : BRAND.sageText}>{icon}</span>
        <Badge className={isWarm ? BRAND.warmBadge : BRAND.greenBadge}>
          {badge}
        </Badge>
      </div>

      <div className="space-y-2">
        <h3
          className={`text-sm font-bold ${isWarm ? BRAND.wineText : BRAND.greenText}`}
        >
          {title}
        </h3>
        <p className="text-sm text-muted-foreground">{intro}</p>
      </div>

      <Separator />

      <ol className="space-y-3">
        {steps.map((step, index) => (
          <li key={step} className="flex items-start gap-3">
            <span
              className={`mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border text-sm font-medium ${
                isWarm
                  ? "border-[#885053] text-[#885053] dark:border-[#F67373] dark:text-[#F67373]"
                  : "border-[#6F8459] text-[#325024] dark:text-[#D4E7CB]"
              }`}
            >
              {index + 1}
            </span>
            <span className="text-sm text-muted-foreground">{step}</span>
          </li>
        ))}
      </ol>
    </Card>
  );
}
