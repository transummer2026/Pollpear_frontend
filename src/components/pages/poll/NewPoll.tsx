import { useState } from "react";
import { ListChecks, Gauge } from "lucide-react";
import { useSearchParams } from "react-router";
import { cn } from "@/lib/utils";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import SingleChoiceSection from "@/components/poll/pollCreation/SingleChoiceSection";
import Layout from "@/layout/Layout";
import SliderSection from "@/components/poll/pollCreation/SliderSection";

const pollTypes = [
  {
    id: "single",
    label: "Single choice poll",
    icon: ListChecks,
  },
  {
    id: "slider",
    label: "slider",
    icon: Gauge,
  },
];

export default function PollCreatorCard() {
  const [searchParams] = useSearchParams();
  const roomIdParam = Number(searchParams.get("roomId"));
  const roomId =
    Number.isInteger(roomIdParam) && roomIdParam > 0 ? roomIdParam : undefined;
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
            {activeTab === "single" && <SingleChoiceSection roomId={roomId} />}
            {activeTab === "slider" && <SliderSection roomId={roomId} />}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
