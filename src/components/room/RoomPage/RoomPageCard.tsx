import { RoomChatProvider } from "@/components/room/RoomChat/RoomChatProvider";
import RoomPageCardDesktop from "./RoomPageCardDesktop";
import RoomPageCardMobile from "./RoomPageCardMobile";

type RoomProps = {
  id?: number;
};

/**
 * The room page, in its two layouts. Both are mounted and one is hidden by CSS,
 * but the chat provider sits above them so a single connection and a single
 * message list serve either — and `key={id}` resets it when the visitor walks
 * from one room to another.
 */
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
