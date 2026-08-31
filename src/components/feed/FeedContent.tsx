import { useState, type ComponentType } from "react";
import { LayoutGrid, Vote } from "lucide-react";

import FeedPollSection from "@/components/feed/FeedPollSection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { PaginationControls } from "@/components/ui/pagination-controls";
import { usePollsFeed, useVotedPolls } from "@/hooks/poll/use-poll";
import { usePagination } from "@/hooks/use-pagination";
import { cn } from "@/lib/utils";

// How many ranked polls to ask the recommender for. Forwarded as
// `/feed?limit=`; the backend caps it and the AI orders the result.
const FEED_SIZE = 25;
const VOTED_PAGE_SIZE = 12;

type TabId = "feed" | "voted";

type FeedTab = {
  id: TabId;
  label: string;
  icon: ComponentType<{ size?: number }>;
  count?: number;
};

/**
 * The two faces of the home feed: what the recommender suggests, and what the
 * user has already voted on. Only the second is paginated — the ranked feed is
 * a fixed, short list, while the voted one grows for the life of the account.
 *
 * A failing feed is rendered inline with a retry rather than bubbling up: the
 * recommender is a separate service, and its being down leaves the rest of the
 * page perfectly usable (see the /feed exception in fetcher).
 */
export default function FeedContent() {
  const {
    data: feedPolls,
    error: feedError,
    mutate: retryFeed,
  } = usePollsFeed(FEED_SIZE);
  const { data: votedPolls } = useVotedPolls();

  const [activeTab, setActiveTab] = useState<TabId>("feed");

  const votedPage = usePagination(votedPolls ?? [], VOTED_PAGE_SIZE);

  const tabs: FeedTab[] = [
    { id: "feed", label: "Feed", icon: LayoutGrid, count: feedPolls?.length },
    { id: "voted", label: "Voted", icon: Vote, count: votedPolls?.length },
  ];

  return (
    <div>
      <div className="flex items-end gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex flex-1 items-center justify-center gap-2 rounded-t-xl border border-b-card px-5 py-3 text-sm font-medium transition-all duration-200",
                active
                  ? "bg-card z-10 translate-y-px"
                  : "bg-muted/60 hover:bg-muted",
              )}
            >
              <Icon size={17} />

              <span>{tab.label}</span>

              {tab.count !== undefined ? (
                <Badge variant="secondary" className="h-5 min-w-5 px-1.5">
                  {tab.count}
                </Badge>
              ) : null}
            </button>
          );
        })}
      </div>

      <Card className="rounded-t-none ring-0 border border-t-0 border-foreground/10">
        {activeTab === "feed" ? (
          <CardContent>
            {feedError ? (
              <div className="flex flex-col items-center gap-3 py-10 text-center">
                <p className="text-sm text-muted-foreground">
                  The feed is temporarily unavailable. Please try again in a
                  moment.
                </p>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => void retryFeed()}
                >
                  Retry
                </Button>
              </div>
            ) : feedPolls ? (
              <FeedPollSection
                polls={feedPolls}
                emptyLabel="Nothing in your feed yet. Come back once there are more polls to explore."
              />
            ) : null}
          </CardContent>
        ) : (
          <>
            <CardContent>
              {votedPolls ? (
                <FeedPollSection
                  polls={votedPage.pageItems}
                  emptyLabel="You haven't voted on any poll yet."
                />
              ) : null}
            </CardContent>

            {votedPage.pageCount > 1 ? (
              <CardFooter>
                <PaginationControls
                  page={votedPage.page}
                  pageCount={votedPage.pageCount}
                  onPageChange={votedPage.setPage}
                  className="mt-2"
                />
              </CardFooter>
            ) : null}
          </>
        )}
      </Card>
    </div>
  );
}
