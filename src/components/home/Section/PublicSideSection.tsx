import { Hash, TrendingUp, Trophy, UserPlus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import FeatureCard from "@/components/home/Section/FeatureCard";
import { BRAND } from "@/components/home/Section/brand";
import { TRENDING_POLLS } from "@/components/home/Section/demos";

export default function PublicSideSection() {
  return (
    <section className={`px-6 py-12 ${BRAND.sectionBorder}`}>
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="max-w-2xl space-y-2">
          <Badge className={BRAND.greenBadge}>The public side</Badge>
          <h2 className="font-heading text-2xl md:text-3xl font-bold">
            A social network built around opinions
          </h2>
          <p className="text-muted-foreground">
            Every account has a public profile and a feed. Follow the people
            whose questions you like, add friends, and let the platform answer
            the things you have always wondered about.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <FeatureCard icon={<TrendingUp size={18} />} title="A living feed">
            Your feed mixes the polls of the people you follow with the public
            trends of the moment — the questions everyone is voting on right
            now.
          </FeatureCard>

          <FeatureCard icon={<UserPlus size={18} />} title="Friends & profiles">
            Send a friend request, browse someone's profile, see the polls they
            created and the ones they answered.
          </FeatureCard>

          <FeatureCard icon={<Hash size={18} />} title="Hashtags">
            Tag a poll with <span className="font-medium">#food</span>,{" "}
            <span className="font-medium">#dev</span> or{" "}
            <span className="font-medium">#politics</span> and let people find
            it through search.
          </FeatureCard>

          <FeatureCard icon={<Trophy size={18} />} title="Ranking">
            The ranking shows who actually makes the platform move — the people
            whose polls everyone ends up answering.
          </FeatureCard>
        </div>

        <Card size="sm" className={`p-4 space-y-4 ${BRAND.softBorder}`}>
          <p
            className={`text-sm uppercase tracking-wide font-semibold ${BRAND.sageText}`}
          >
            Trending right now
          </p>

          <div className="grid gap-3 md:grid-cols-3">
            {TRENDING_POLLS.map((poll) => (
              <div
                key={poll.title}
                className={`rounded-xl border p-3 space-y-2 bg-[#D4E7CB]/25 dark:bg-[#3A4336]/40 ${BRAND.softBorder}`}
              >
                <p className="text-sm font-medium">{poll.title}</p>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className={BRAND.hashtagBadge}>
                    #{poll.tag}
                  </Badge>
                  <span className={`text-sm ${BRAND.sageText}`}>
                    {poll.votes}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}
