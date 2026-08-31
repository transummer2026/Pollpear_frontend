import { useMemo, useState } from "react";
import { usePollsUser } from "@/hooks/poll/use-poll";
import PollColumns from "@/components/poll/PollColumns";
import PollStatusFilter from "@/components/poll/PollStatusFilter";
import { filterPolls, type PollFilter } from "@/lib/poll";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { usePagination } from "@/hooks/use-pagination";
import { PaginationControls } from "@/components/ui/pagination-controls";

const PAGE_SIZE = 12;
const NO_POLLS: never[] = [];

export default function MainContentUser({ id: userId }: { id: number }) {
  const { data: polls } = usePollsUser(userId);
  const [filter, setFilter] = useState<PollFilter>("all");

  const visiblePolls = useMemo(
    () => filterPolls(polls ?? NO_POLLS, filter),
    [polls, filter],
  );

  const { page, setPage, pageCount, pageItems } = usePagination(
    visiblePolls,
    PAGE_SIZE,
  );

  /**
   * Nothing to show and nothing to filter: an author with no poll at all gets
   * no card. Gated on the whole list rather than the filtered one on purpose —
   * hiding on `visiblePolls` would take the status filter away with it, and
   * leave no way back from a filter that happens to match nothing.
   */
  if (!polls?.length) return null;

  return (
    <Card className="w-full ring-0">
      <CardHeader className="flex justify-end">
        <PollStatusFilter value={filter} onChange={setFilter} />
      </CardHeader>
      <CardContent>
        <PollColumns polls={pageItems} />
      </CardContent>
      <CardFooter>
        <PaginationControls
          page={page}
          pageCount={pageCount}
          onPageChange={setPage}
          className="mt-2"
        />
      </CardFooter>
    </Card>
  );
}
