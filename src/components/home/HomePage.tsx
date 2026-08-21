import { useState, type ReactNode } from "react";
import { Link } from "react-router";
import PollResult from "@/components/poll/PollResult";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import {
  ArrowRight,
  CalendarClock,
  EyeOff,
  Globe,
  Hash,
  Lock,
  MessagesSquare,
  Sparkles,
  TrendingUp,
  Trophy,
  UserPlus,
  Users,
  Vote,
} from "lucide-react";

/* Landing page for guests: everything below is hardcoded on purpose, no API call. */

type DemoOption = {
  id: number;
  text: string;
  votes: number;
};

const SINGLE_CHOICE_DEMO = {
  title: "Where should the team offsite happen this year?",
  description: "One vote per person. Closes in 3 days.",
  hashtags: ["work", "offsite"],
  options: [
    { id: 1, text: "Lisbon", votes: 128 },
    { id: 2, text: "Berlin", votes: 74 },
    { id: 3, text: "Marseille", votes: 96 },
    { id: 4, text: "Stay remote", votes: 41 },
  ] satisfies DemoOption[],
};

const MULTIPLE_CHOICE_DEMO = {
  title: "Which nights work for the family dinner?",
  hashtags: ["family"],
  options: [
    { id: 1, text: "Friday", votes: 9 },
    { id: 2, text: "Saturday", votes: 12 },
    { id: 3, text: "Sunday", votes: 5 },
  ] satisfies DemoOption[],
};

const SLIDER_DEMO = {
  title: "How ready are we to ship on Friday?",
  leftLabel: "Not at all",
  rightLabel: "Ship it",
  average: 65,
  voters: 23,
};

function DemoHashtags({ hashtags }: { hashtags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {hashtags.map((hashtag) => (
        <Badge key={hashtag} variant="outline">
          #{hashtag}
        </Badge>
      ))}
    </div>
  );
}

/* Vote card -> result card, exactly like a real poll but with local state only. */
function DemoSingleChoicePoll() {
  const [votedOptionId, setVotedOptionId] = useState<number | null>(null);

  const options = SINGLE_CHOICE_DEMO.options.map((option) =>
    option.id === votedOptionId
      ? { ...option, votes: option.votes + 1 }
      : option,
  );
  const totalVotes = options.reduce((total, option) => total + option.votes, 0);

  if (votedOptionId === null)
    return (
      <Card
        size="sm"
        className="w-full self-start p-4 space-y-4 poll-card-raised ring-0"
      >
        <div className="flex items-center justify-between gap-2">
          <Badge>Open</Badge>
          <span className="text-xs text-muted-foreground">Single choice</span>
        </div>

        <h3 className="text-sm font-bold">{SINGLE_CHOICE_DEMO.title}</h3>

        <p className="text-sm text-muted-foreground">
          {SINGLE_CHOICE_DEMO.description}
        </p>

        <div className="space-y-2">
          {SINGLE_CHOICE_DEMO.options.map((option) => (
            <Button
              key={option.id}
              type="button"
              variant="outline"
              className="w-full justify-between h-12 hover:bg-muted"
              onClick={() => setVotedOptionId(option.id)}
            >
              <span>{option.text}</span>
            </Button>
          ))}
        </div>

        <DemoHashtags hashtags={SINGLE_CHOICE_DEMO.hashtags} />

        <p className="text-xs text-muted-foreground">
          Try it — this one is a demo, nothing is saved.
        </p>
      </Card>
    );

  return (
    <Card
      size="sm"
      className="w-full self-start p-4 space-y-3 poll-card-sunken ring-0"
    >
      <div className="flex items-center justify-between gap-2">
        <Badge>Open</Badge>
        <span className="text-xs text-muted-foreground">Single choice</span>
      </div>

      <h3 className="text-sm font-bold">{SINGLE_CHOICE_DEMO.title}</h3>

      <div className="space-y-3">
        {options.map((option) => (
          <div key={option.id} className="p-2">
            <PollResult answer={option} totalVotes={totalVotes} />
          </div>
        ))}
      </div>

      <div className="border-t pt-4 flex items-center justify-between gap-2 text-sm text-muted-foreground">
        <span className="flex items-center gap-2">
          <Vote size={16} />
          {totalVotes} votes
        </span>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setVotedOptionId(null)}
        >
          Change my vote
        </Button>
      </div>
    </Card>
  );
}

function DemoMultipleChoicePoll() {
  const totalVotes = MULTIPLE_CHOICE_DEMO.options.reduce(
    (total, option) => total + option.votes,
    0,
  );

  return (
    <Card
      size="sm"
      className="w-full self-start p-4 space-y-3 poll-card-sunken ring-0"
    >
      <div className="flex items-center justify-between gap-2">
        <Badge variant="destructive">Closed</Badge>
        <span className="text-xs text-muted-foreground">Multiple choice</span>
      </div>

      <h3 className="text-sm font-bold">{MULTIPLE_CHOICE_DEMO.title}</h3>

      <div className="space-y-3">
        {MULTIPLE_CHOICE_DEMO.options.map((option) => (
          <div key={option.id} className="p-2">
            <PollResult answer={option} totalVotes={totalVotes} />
          </div>
        ))}
      </div>

      <DemoHashtags hashtags={MULTIPLE_CHOICE_DEMO.hashtags} />

      <div className="border-t pt-4 flex items-center gap-2 text-sm text-muted-foreground">
        <Vote size={16} />
        {totalVotes} votes
      </div>
    </Card>
  );
}

function DemoSliderPoll() {
  return (
    <Card
      size="sm"
      className="w-full self-start p-4 space-y-4 poll-card-raised ring-0"
    >
      <div className="flex items-center justify-between gap-2">
        <Badge>Open</Badge>
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

type FeatureCardProps = {
  icon: ReactNode;
  title: string;
  children: ReactNode;
};

function FeatureCard({ icon, title, children }: FeatureCardProps) {
  return (
    <Card size="sm" className="p-4 space-y-2">
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">{icon}</span>
        <h3 className="text-sm font-bold">{title}</h3>
      </div>
      <p className="text-sm text-muted-foreground">{children}</p>
    </Card>
  );
}

type PathCardProps = {
  icon: ReactNode;
  badge: string;
  title: string;
  intro: string;
  steps: string[];
};

/* One of the two ways to ask: the public feed, or a private room. */
function PathCard({ icon, badge, title, intro, steps }: PathCardProps) {
  return (
    <Card size="sm" className="p-4 space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">{icon}</span>
        <Badge variant="secondary">{badge}</Badge>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-bold">{title}</h3>
        <p className="text-sm text-muted-foreground">{intro}</p>
      </div>

      <Separator />

      <ol className="space-y-3">
        {steps.map((step, index) => (
          <li key={step} className="flex items-start gap-3">
            <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border text-xs font-medium">
              {index + 1}
            </span>
            <span className="text-sm text-muted-foreground">{step}</span>
          </li>
        ))}
      </ol>
    </Card>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero */}
        <section className="px-6 py-16 md:py-24">
          <div className="mx-auto max-w-5xl text-center space-y-6">
            <Badge variant="outline" className="mx-auto">
              <Sparkles size={14} className="mr-1" />
              Polls, but social
            </Badge>

            <h1 className="font-heading text-4xl md:text-6xl font-bold tracking-tight">
              Ask anything. Decide together.
            </h1>

            <p className="mx-auto max-w-2xl text-base md:text-lg text-muted-foreground">
              PollPear turns a simple question into a decision. Post a poll to
              the public feed and watch the whole platform answer, or open a
              private room and invite your friends, your family or your team to
              settle it between you.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button asChild size="lg">
                <Link to="/auth/register">
                  Create your account
                  <ArrowRight size={16} />
                </Link>
              </Button>

              <Button asChild variant="outline" size="lg">
                <Link to="/auth/login">Sign in</Link>
              </Button>
            </div>

            <p className="text-xs text-muted-foreground">
              Free to use — a poll takes about thirty seconds to set up.
            </p>
          </div>
        </section>

        {/* Poll examples */}
        <section className="px-6 py-12 border-t">
          <div className="mx-auto max-w-6xl space-y-8">
            <div className="max-w-2xl space-y-2">
              <h2 className="font-heading text-2xl md:text-3xl font-bold">
                Three ways to ask
              </h2>
              <p className="text-muted-foreground">
                Single choice, multiple choice or a slider when the answer is a
                feeling rather than an option. Results appear as soon as you
                vote, and you can change your mind until the deadline.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3 items-start">
              <DemoSingleChoicePoll />
              <DemoMultipleChoicePoll />
              <DemoSliderPoll />
            </div>
          </div>
        </section>

        {/* Social network */}
        <section className="px-6 py-12 border-t">
          <div className="mx-auto max-w-6xl space-y-8">
            <div className="max-w-2xl space-y-2">
              <Badge variant="secondary">The public side</Badge>
              <h2 className="font-heading text-2xl md:text-3xl font-bold">
                A social network built around opinions
              </h2>
              <p className="text-muted-foreground">
                Every account has a public profile and a feed. Follow the people
                whose questions you like, add friends, and let the platform
                answer the things you have always wondered about.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <FeatureCard
                icon={<TrendingUp size={18} />}
                title="A living feed"
              >
                Your feed mixes the polls of the people you follow with the
                public trends of the moment — the questions everyone is voting
                on right now.
              </FeatureCard>

              <FeatureCard
                icon={<UserPlus size={18} />}
                title="Friends & profiles"
              >
                Send a friend request, browse someone's profile, see the polls
                they created and the ones they answered.
              </FeatureCard>

              <FeatureCard icon={<Hash size={18} />} title="Hashtags">
                Tag a poll with <span className="font-medium">#food</span>,{" "}
                <span className="font-medium">#dev</span> or{" "}
                <span className="font-medium">#politics</span> and let people
                find it through search.
              </FeatureCard>

              <FeatureCard icon={<Trophy size={18} />} title="Ranking">
                The ranking shows who actually makes the platform move — the
                people whose polls everyone ends up answering.
              </FeatureCard>
            </div>

            <Card size="sm" className="p-4 space-y-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Trending right now
              </p>

              <div className="grid gap-3 md:grid-cols-3">
                {[
                  {
                    title: "Pineapple on pizza: yes or no?",
                    votes: "12 480 votes",
                    tag: "food",
                  },
                  {
                    title: "Tabs or spaces, one last time",
                    votes: "8 902 votes",
                    tag: "dev",
                  },
                  {
                    title: "Best month to take holidays in France",
                    votes: "3 117 votes",
                    tag: "life",
                  },
                ].map((poll) => (
                  <div
                    key={poll.title}
                    className="rounded-xl border p-3 space-y-2"
                  >
                    <p className="text-sm font-medium">{poll.title}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">#{poll.tag}</Badge>
                      <span className="text-xs text-muted-foreground">
                        {poll.votes}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </section>

        {/* Rooms */}
        <section className="px-6 py-12 border-t">
          <div className="mx-auto max-w-6xl space-y-8">
            <div className="max-w-2xl space-y-2">
              <Badge variant="secondary">The private side</Badge>
              <h2 className="font-heading text-2xl md:text-3xl font-bold">
                Rooms: vote in private, decide with your people
              </h2>
              <p className="text-muted-foreground">
                A room is a closed space you own. Invite your friends, your
                family or your colleagues, group several polls together, talk in
                the room messages and close it when the decision is made.
                Nothing leaves the room — invited members only.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr] items-start">
              <div className="grid gap-4 sm:grid-cols-2">
                <FeatureCard icon={<Lock size={18} />} title="Invitation only">
                  A private room is invisible to everyone else. Members join
                  through an invitation they can accept or refuse.
                </FeatureCard>

                <FeatureCard
                  icon={<MessagesSquare size={18} />}
                  title="Private messages"
                >
                  Discuss inside the room while the vote is running — the
                  argument and the decision stay in the same place.
                </FeatureCard>

                <FeatureCard
                  icon={<CalendarClock size={18} />}
                  title="Deadlines & dependencies"
                >
                  Give the room a deadline, and chain your polls: the answer to
                  one question decides which question comes next.
                </FeatureCard>

                <FeatureCard
                  icon={<EyeOff size={18} />}
                  title="Ask anonymously"
                >
                  Post a poll without your name attached when the question is
                  easier to ask than to sign.
                </FeatureCard>
              </div>

              {/* Room example */}
              <Card size="sm" className="p-4 space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold">
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
                  {[
                    { title: "Venue: barn or seaside?", status: "Closed" },
                    {
                      title: "Menu — pick your two favourites",
                      status: "Open",
                    },
                    { title: "Playlist veto list", status: "Open" },
                  ].map((poll) => (
                    <div
                      key={poll.title}
                      className="flex items-center justify-between gap-2 rounded-xl border p-3"
                    >
                      <span className="text-sm">{poll.title}</span>
                      <Badge
                        variant={
                          poll.status === "Closed" ? "destructive" : "default"
                        }
                      >
                        {poll.status}
                      </Badge>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-3">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    Room messages
                  </p>

                  {[
                    {
                      author: "Tom",
                      message:
                        "Barn won by 3 votes — I'm calling them tomorrow.",
                    },
                    {
                      author: "Mum",
                      message:
                        "Can we add a vegetarian option to the menu poll?",
                    },
                  ].map((message) => (
                    <div key={message.author} className="text-sm">
                      <span className="font-medium">{message.author}</span>{" "}
                      <span className="text-muted-foreground">
                        {message.message}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Users size={14} />
                  Family, friends and the caterer — nobody else can see this.
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="px-6 py-12 border-t">
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

        {/* Final call to action */}
        <section className="px-6 py-16 border-t">
          <div className="mx-auto max-w-3xl text-center space-y-4">
            <h2 className="font-heading text-2xl md:text-3xl font-bold">
              What are you going to ask first?
            </h2>
            <p className="text-muted-foreground">
              Create an account, open your first room, and stop deciding by
              group chat.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button asChild size="lg">
                <Link to="/auth/register">
                  Get started
                  <ArrowRight size={16} />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/contact">Contact us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
