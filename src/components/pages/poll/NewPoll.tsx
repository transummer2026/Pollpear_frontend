import { useState } from "react";
import { ListChecks, Gauge } from "lucide-react";
import { useSearchParams } from "react-router";
import { cn } from "@/lib/utils";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import SingleChoiceSection from "@/components/poll/pollCreation/SingleChoiceSection";
import Layout from "@/layout/Layout";
import SliderSection from "@/components/poll/pollCreation/SliderSection";

const pollTypes = [
  {
    id: "single",
    label: "Choice poll",
    icon: ListChecks,
    description: "Ask a question and let people pick from your options.",
  },
  {
    id: "slider",
    label: "Slider poll",
    icon: Gauge,
    description: "Ask people to place their answer on a scale.",
  },
];

export default function PollCreatorCard() {
  const [searchParams] = useSearchParams();
  const roomIdParam = Number(searchParams.get("roomId"));
  const roomId =
    Number.isInteger(roomIdParam) && roomIdParam > 0 ? roomIdParam : undefined;
  const [activeTab, setActiveTab] = useState("single");

  const activeType =
    pollTypes.find((tab) => tab.id === activeTab) ?? pollTypes[0];

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
                  "flex items-center gap-2 rounded-t-xl border-x border-t px-5 py-3 text-sm font-medium transition-all duration-200",
                  // no shadow: it would cast a line along the bottom edge,
                  // which has to stay open so the tab reads as part of the card
                  active ? "bg-background" : "bg-muted/60 hover:bg-muted",
                )}
              >
                <Icon size={17} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/*
          ring-0 + explicit side borders: a ring draws all four edges, and its
          top one runs right under the tabs. Dropping it welds the tabs to the
          card while keeping the outline on the three other sides.
        */}
        <Card className="rounded-t-none border-x border-b ring-0">
          <CardHeader>
            <CardTitle className="text-2xl">Create a poll</CardTitle>
            <CardDescription>{activeType.description}</CardDescription>
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
