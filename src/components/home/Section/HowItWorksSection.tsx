import { Globe, Users } from "lucide-react";
import PathCard from "@/components/home/Section/PathCard";

export default function HowItWorksSection() {
  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="max-w-2xl space-y-2">
          <h2 className="font-heading text-2xl md:text-3xl font-bold">
            How it works
          </h2>
          <p className="text-muted-foreground">
            Two ways to get an answer: ask randoms, or ask your pears. Same
            question, very different room.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 items-start">
          <PathCard
            tone="green"
            icon={<Globe size={18} />}
            badge="Ask randoms"
            title="Create a public poll"
            intro="It goes straight to the feed, and the whole platform can answer — the people who follow you, the ones browsing your hashtags, and complete strangers."
            steps={[
              "Write your question, pick single choice, multiple choice or slider.",
              "Publish it — it lands on the public feed and in the hashtag search.",
              "Watch the percentages move, live, as the votes come in.",
            ]}
          />

          <PathCard
            tone="warm"
            icon={<Users size={18} />}
            badge="Ask your pears"
            title="Create a room and fill it with polls"
            intro="A room is a closed space you own. Invite the people who are actually concerned and put as many polls in it as the decision needs."
            steps={[
              "Open a room and invite your friends, your family or your team.",
              "Add your polls one after the other — venue, then menu, then playlist.",
              "Argue in the room messages, and close it once the decision is made.",
            ]}
          />
        </div>
      </div>
    </section>
  );
}
