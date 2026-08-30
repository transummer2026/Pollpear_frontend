import ProfileCardFeed from "./ProfileCardFeed";
import RoomsSectionFeed from "./RoomsSectionFeed";
import FriendsSectionFeed from "./FriendsSectionFeed";
import FeedContent from "./FeedContent";

export default function FeedCard() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[3fr_1fr] lg:items-start">
          <main className="min-w-0">
            <FeedContent />
          </main>
          <aside className=" space-y-3 lg:sticky lg:top-6 lg:self-start ">
            <ProfileCardFeed />
            <RoomsSectionFeed />
            <FriendsSectionFeed />
          </aside>
        </div>
      </div>
    </div>
  );
}
