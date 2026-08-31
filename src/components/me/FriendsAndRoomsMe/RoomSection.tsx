import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PaginationControls } from "@/components/ui/pagination-controls";
import RoomBadge from "@/components/me/FriendsAndRoomsMe/RoomBadge";
import { useRooms } from "@/hooks/room/use-room";
import { usePagination } from "@/hooks/use-pagination";

const PAGE_SIZE = 4;
const NO_ROOMS: never[] = [];

/** The rooms the viewer belongs to. Hidden entirely when they are in none. */
export default function RoomSection() {
  const { data: rooms } = useRooms();
  const { page, setPage, pageCount, pageItems } = usePagination(
    rooms ?? NO_ROOMS,
    PAGE_SIZE,
  );

  if (!rooms?.length) return null;

  return (
    <Card className="ring-0">
      <CardHeader className="text-center">
        <CardTitle className="text-lg">Rooms</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-1">
          {pageItems.map((room) => (
            <li key={room.id}>
              <RoomBadge room={room} />
            </li>
          ))}
        </ul>
        <PaginationControls
          page={page}
          pageCount={pageCount}
          onPageChange={setPage}
          className="mt-2"
        />
      </CardContent>
    </Card>
  );
}
