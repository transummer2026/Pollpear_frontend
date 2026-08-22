import NewRoomCard from "@/components/room/roomCreation/NewRoomCard";
import Layout from "@/layout/Layout";
export default function NewRoom() {
  return (
    <div className="min-h-screen flex flex-col">
      <Layout>
        <main className="flex-1">
          <div className="flex justify-center mt-6">
            <NewRoomCard />
          </div>
        </main>
      </Layout>
    </div>
  );
}
