import RoomPageCard from "@/components/room/RoomPage/RoomPageCard";
import { useParams } from "react-router";

export default function RoomsPage() {
  const { id } = useParams<{ id: string }>();
  const roomId = Number(id);

  return <RoomPageCard id={Number.isInteger(roomId) ? roomId : undefined} />;
}
