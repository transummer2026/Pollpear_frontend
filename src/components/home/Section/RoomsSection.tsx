import {
  CalendarClock,
  EyeOff,
  Lock,
  MessagesSquare,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import FeatureCard from "@/components/home/Section/FeatureCard";
import { BRAND } from "@/components/home/Section/brand";
import {
  ROOM_DEMO_MESSAGES,
  ROOM_DEMO_POLLS,
} from "@/components/home/Section/demos";

export default function RoomsSection() {
  return (
    <section className={`px-6 py-12 ${BRAND.sectionBorder}`}>
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="max-w-2xl space-y-2">
          <Badge className={BRAND.warmBadge}>The private side</Badge>
          <h2 className="font-heading text-2xl md:text-3xl font-bold">
            Rooms: vote in private, decide with your people
          </h2>
          <p className="text-muted-foreground">
            A room is a closed space you own. Invite your friends, your family
            or your colleagues, group several polls together, talk in the room
            messages and close it when the decision is made. Nothing leaves the
            room — invited members only.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr] items-start">
          <div className="grid gap-4 sm:grid-cols-2">
            <FeatureCard icon={<Lock size={18} />} title="Invitation only">
              A private room is invisible to everyone else. Members join through
              an invitation they can accept or refuse.
            </FeatureCard>

            <FeatureCard
              icon={<MessagesSquare size={18} />}
              title="Private messages"
            >
              Discuss inside the room while the vote is running — the argument
              and the decision stay in the same place.
            </FeatureCard>

            <FeatureCard
              icon={<CalendarClock size={18} />}
              title="Deadlines & dependencies"
            >
              Give the room a deadline, and chain your polls: the answer to one
              question decides which question comes next.
            </FeatureCard>

            <FeatureCard icon={<EyeOff size={18} />} title="Ask anonymously">
              Post a poll without your name attached when the question is easier
              to ask than to sign.
            </FeatureCard>
          </div>

          <Card
            size="sm"
            className="p-4 space-y-4 border-[#FFE0E0] dark:border-[#885053]/60"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="space-y-1">
                <h3 className={`text-sm font-bold`}>
                  Sarah &amp; Tom — Wedding
                </h3>
                <p className="text-xs text-muted-foreground">
                  Private room · 14 members · closes in 6 days
                </p>
              </div>
              <Badge>
                <Lock size={12} className="mr-1" />
                Private
              </Badge>
            </div>

            <Separator />

            <div className="space-y-2">
              {ROOM_DEMO_POLLS.map((poll) => (
                <div
                  key={poll.title}
                  className={`flex items-center justify-between gap-2 rounded-xl border p-3 ${BRAND.softBorder}`}
                >
                  <span className="text-sm">{poll.title}</span>
                  <Badge
                    className={
                      poll.status === "Closed"
                        ? BRAND.closedBadge
                        : BRAND.openBadge
                    }
                  >
                    {poll.status}
                  </Badge>
                </div>
              ))}
            </div>

            <Separator />

            <div className="space-y-3">
              <p
                className={`text-xs uppercase tracking-wide font-semibold ${BRAND.wineText}`}
              >
                Room messages
              </p>

              {ROOM_DEMO_MESSAGES.map((message) => (
                <div key={message.author} className="text-sm">
                  <span className={`font-medium ${BRAND.wineText}`}>
                    {message.author}
                  </span>{" "}
                  <span className="text-muted-foreground">
                    {message.message}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Users size={14} className="text-[#F67373]" />
              Family, friends and the caterer — nobody else can see this.
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
