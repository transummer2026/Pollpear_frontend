import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { BRAND } from "@/components/home/Section/brand";

type FeatureCardProps = {
  icon: ReactNode;
  title: string;
  children: ReactNode;
};

export default function FeatureCard({
  icon,
  title,
  children,
}: FeatureCardProps) {
  return (
    <Card size="sm" className={`p-4 space-y-2 ${BRAND.softBorder}`}>
      <div className="flex items-center gap-2">
        <span className={BRAND.sageText}>{icon}</span>
        <h3 className={`text-sm font-bold ${BRAND.greenText}`}>{title}</h3>
      </div>
      <p className="text-sm text-muted-foreground">{children}</p>
    </Card>
  );
}
