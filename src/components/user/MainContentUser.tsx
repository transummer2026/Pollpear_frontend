import { usePollsUser } from "@/hooks/poll/use-poll";
import PollColumns from "@/components/poll/PollColumns";
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
