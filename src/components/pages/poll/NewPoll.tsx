import { useState } from "react";
import { ListChecks, Gauge } from "lucide-react";

import { cn } from "@/lib/utils";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import SingleChoiceSection from "@/components/poll/pollCreation/SingleChoiceSection";
import Layout from "@/layout/Layout";
import ScaleSection from "@/components/poll/pollCreation/ScaleSection";
// Free field poll type on hold, not implemented yet (see FreeFormSection.tsx).
// import FreeFormSection from "@/components/poll/pollCreation/FreeFormSection";

const pollTypes = [
  {
    id: "single",
    label: "Single choice poll",
    icon: ListChecks,
  },
  {
    id: "scale",
    label: "Scale",
    icon: Gauge,
  },
  // {
  //   id: "freeForm",
  //   label: "free form",
  //   icon: MessageSquareText,
  // },
];

export default function PollCreatorCard() {
  const [activeTab, setActiveTab] = useState("single");

  return (
    <Layout>
      <div className="max-w-5xl mx-auto mt-6">
        <div className="flex items-end gap-1 px-4">
          {pollTypes.map((tab) => {
            const Icon = tab.icon;

            const active = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 rounded-t-xl border px-5 py-3 text-sm font-medium transition-all duration-200",
                  active
                    ? "bg-background border-b-background shadow-sm z-10 translate-y-px"
                    : "bg-muted/60 hover:bg-muted border-b",
                )}
              >
                <Icon size={17} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>

        <Card className="rounded-t-none">
          <CardHeader>
            <CardTitle className="text-2xl">Create a poll</CardTitle>
          </CardHeader>

          <CardContent>
            {activeTab === "single" && <SingleChoiceSection />}
            {activeTab === "scale" && <ScaleSection />}
            {/* {activeTab === "freeForm" && <FreeFormSection />} */}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
