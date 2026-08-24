import Layout from "@/layout/Layout";
import RoomInfoCard from "@/components/room/RoomInfoCard";
import RoomPearticipants from "@/components/room/RoomPearticipants";
import RoomPolls from "@/components/room/RoomPolls";
import RoomMessages from "@/components/room/RoomMessages";
import { Skeleton } from "@/components/ui/skeleton";
import { useRoom } from "@/hooks/room/use-room";

type RoomProps = {
  id?: number;
};

export default function RoomPageCard({ id }: RoomProps) {
  const { data: room, isLoading } = useRoom(id);

  if (!id) {
    return (
      <Layout>
        <div className="p-4 text-center">Room not found</div>
      </Layout>
    );
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="mx-auto max-w-7xl p-4">
          <Skeleton className="h-40 w-full" />
        </div>
      </Layout>
    );
  }

  if (!room) {
    return (
      <Layout>
        <div className="p-4 text-center">Room not found</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 p-4 lg:grid-cols-4">
        <div className="lg:col-span-4">
          <RoomInfoCard room={room} />
        </div>
        <div className="lg:col-span-1 lg:col-start-4 lg:row-start-2">
          <RoomPearticipants room={room} />
        </div>
        <div className="lg:col-span-3 lg:col-start-1 lg:row-span-2 lg:row-start-2">
          <RoomPolls room={room} />
        </div>
        <div className="lg:col-span-1 lg:col-start-4 lg:row-start-3">
          <RoomMessages room={room} />
        </div>
      </div>
    </Layout>
  );
}
