import RoomInfoCard from "@/components/room/RoomPage/Section/RoomInfoCard";
import RoomInvitationBanner from "@/components/room/RoomPage/Section/RoomInvitationBanner";
import RoomPearticipants from "@/components/room/RoomPage/Section/RoomPearticipants";
import RoomPolls from "@/components/room/RoomPage/Section/RoomPolls";
import RoomMessages from "@/components/room/RoomPage/Section/RoomMessages";
import Layout from "@/layout/Layout";
import { Skeleton } from "@/components/ui/skeleton";
import { useRoom } from "@/hooks/room/use-room";

type RoomProps = {
  id?: number;
};

/**
 * Desktop room layout. "Not found" is not necessarily a missing room: a private
 * room answers 403 to someone who is not in it, and that someone may well be
 * holding an invitation — hence the banner, which turns the dead end into an
 * accept/decline.
 */
export default function RoomPageCardDesktop({ id }: RoomProps) {
  const { data: room, isLoading } = useRoom(id);

  if (isLoading) {
    return (
      <Layout>
        <div className="mx-auto max-w-7xl p-4">
          <Skeleton className="h-40 w-full" />
        </div>
      </Layout>
    );
  }

  if (!id || !room) {
    return (
      <Layout>
        <div className="mx-auto max-w-2xl p-4">
          {id ? (
            <RoomInvitationBanner
              roomId={id}
              fallback={<p className="text-center">Room not found</p>}
            />
          ) : (
            <p className="text-center">Room not found</p>
          )}
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-4 p-4 lg:grid-cols-4">
        <div className="lg:col-span-4 empty:hidden">
          <RoomInvitationBanner roomId={room.id} />
        </div>
        <div className="lg:col-span-4">
          <RoomInfoCard room={room} />
        </div>
        <div className="lg:col-span-3">
          <RoomPolls room={room} />
        </div>
        <div className="flex flex-col gap-4 lg:col-span-1">
          <RoomPearticipants room={room} />
          <RoomMessages />
        </div>
      </div>
    </Layout>
  );
}
