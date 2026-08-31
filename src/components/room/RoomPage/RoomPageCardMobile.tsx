import RoomInfoCard from "@/components/room/RoomPage/Section/RoomInfoCard";
import RoomInvitationBanner from "@/components/room/RoomPage/Section/RoomInvitationBanner";
import RoomPearticipants from "@/components/room/RoomPage/Section/RoomPearticipants";
import RoomPolls from "@/components/room/RoomPage/Section/RoomPolls";
import RoomMessagesDialog from "@/components/room/RoomPage/Section/RoomMessagesDialog";
import Layout from "@/layout/Layout";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useRoom } from "@/hooks/room/use-room";
import { Send } from "lucide-react";
import { useState } from "react";

type RoomProps = {
  id?: number;
};

export default function RoomPageCardMobile({ id }: RoomProps) {
  const { data: room, isLoading } = useRoom(id);
  const [messagesOpen, setMessagesOpen] = useState(false);

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
    <div className="relative">
      <Layout>
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-4 p-4 lg:grid-cols-4">
          <div className="lg:col-span-4 empty:hidden">
            <RoomInvitationBanner roomId={room.id} />
          </div>
          <div className="lg:col-span-4">
            <RoomInfoCard room={room} />
          </div>
          <div className="flex flex-col gap-4 lg:col-span-1">
            <RoomPearticipants room={room} />
          </div>
          <div className="lg:col-span-3">
            <RoomPolls room={room} />
          </div>
        </div>
      </Layout>
      <Button
        size="icon-lg"
        aria-label="Open messages"
        onClick={() => setMessagesOpen(true)}
        className="fixed bottom-17 right-2 opacity-50"
      >
        <Send />
      </Button>
      <RoomMessagesDialog open={messagesOpen} onOpenChange={setMessagesOpen} />
    </div>
  );
}
