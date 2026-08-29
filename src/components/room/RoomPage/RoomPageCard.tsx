import { RoomChatProvider } from "@/components/room/RoomChat/RoomChatProvider";
import RoomPageCardDesktop from "./RoomPageCardDesktop";
import RoomPageCardMobile from "./RoomPageCardMobile";

type RoomProps = {
  id?: number;
};

export default function RoomPageCard({ id }: RoomProps) {
  return (
    <RoomChatProvider key={id} roomId={id}>
      <div className="hidden lg:block">
        <RoomPageCardDesktop id={id} />
      </div>
      <div className="w-full lg:hidden">
        <RoomPageCardMobile id={id} />
      </div>
    </RoomChatProvider>
  );
}
