import { usePollsUser } from "@/hooks/poll/use-poll";
import PollCard from "../poll/PollCard";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { usePagination } from "@/hooks/use-pagination";
import { PaginationControls } from "@/components/ui/pagination-controls";

const PAGE_SIZE = 12;
const NO_POLLS: never[] = [];

export default function MainContentUser({ id: userId }: { id: number }) {
  const { data: polls } = usePollsUser(userId);

  const { page, setPage, pageCount, pageItems } = usePagination(
    polls ?? NO_POLLS,
    PAGE_SIZE,
  );

  if (!polls) return null;

  return (
    <Card>
      <CardContent className="columns-1 md:columns-2 xl:columns-3 gap-5">
        {pageItems.map((poll) => (
          <div key={poll.id} className="mb-5 break-inside-avoid">
            <PollCard poll={poll} />
          </div>
        ))}
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
