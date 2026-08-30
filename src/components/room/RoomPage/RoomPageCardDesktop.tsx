import RoomInfoCard from "@/components/room/RoomPage/Section/RoomInfoCard";
import RoomPearticipants from "@/components/room/RoomPage/Section/RoomPearticipants";
import RoomPolls from "@/components/room/RoomPage/Section/RoomPolls";
import RoomMessages from "@/components/room/RoomPage/Section/RoomMessages";
import Layout from "@/layout/Layout";
import { Skeleton } from "@/components/ui/skeleton";
import { useRoom } from "@/hooks/room/use-room";

type RoomProps = {
  id?: number;
};

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
        <div className="p-4 text-center">Room not found</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-4 p-4 lg:grid-cols-4">
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
