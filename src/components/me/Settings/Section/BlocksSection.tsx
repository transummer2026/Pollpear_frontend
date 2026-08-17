import { useAuth } from "@/hooks/auth/use-auth";
import { useBlockedUsers } from "@/hooks/friend/use-block";
import { toBlockedUser } from "@/components/me/FriendsAndRoomsMe/blocks";
import BlockedBadgeLarge from "@/components/me/FriendsAndRoomsMe/BlockedBadgeLarge";
import { PaginationControls } from "@/components/ui/pagination-controls";
import { usePagination } from "@/hooks/use-pagination";

const PAGE_SIZE = 8;

export default function BlocksSection() {
  const { data: me } = useAuth();
  const { data } = useBlockedUsers(me?.id);
  const blocked = (data ?? []).map(toBlockedUser);
  const { page, setPage, pageCount, pageItems } = usePagination(
    blocked,
    PAGE_SIZE,
  );

  if (blocked.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        You haven&apos;t blocked anyone.
      </p>
    );
  }

  return (
    <div>
      <ul className="space-y-1">
        {pageItems.map((user) => (
          <BlockedBadgeLarge key={user.id} user={user} />
        ))}
      </ul>
      <PaginationControls
        page={page}
        pageCount={pageCount}
        onPageChange={setPage}
        className="mt-2"
      />
    </div>
  );
}
