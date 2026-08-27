import RoomPageCardDesktop from "./RoomPageCardDesktop";
import RoomPageCardMobile from "./RoomPageCardMobile";

type RoomProps = {
  id?: number;
};

export default function RoomPageCard({ id }: RoomProps) {
  return (
    <>
      <div className="hidden lg:block">
        <RoomPageCardDesktop id={id} />
      </div>
      <div className="w-full lg:hidden">
        <RoomPageCardMobile id={id} />
      </div>
    </>
  );
}
