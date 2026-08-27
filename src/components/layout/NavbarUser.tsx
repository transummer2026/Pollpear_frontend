import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { LogoButton } from "@/components/layout/LogoButton";
import { Menubar } from "@/components/ui/menubar";
import { MenuDropdown } from "@/components/layout/MenuDropdown";
import { NotificationsDropdown } from "@/components/layout/NotificationsDropdown";
import { NavbarSearchTrigger } from "@/components/layout/NavbarSearch/NavbarSearchTrigger";

type RoomIdProps = {
  roomId?: number;
};

/**
 * Desktop only: on mobile navigation is handled by <MobileBottomNav /> and,
 * on /me, by <MobileHeaderMe />.
 */
export default function NavbarUser({ roomId }: RoomIdProps) {
  return (
    <Menubar className="hidden h-16 items-center sticky bg-white top-0 px-6 border-x-0 border-t-0 md:flex">
      <LogoButton to="/feed" />
      <div className="ml-auto flex items-center flex-1">
        <NavbarSearchTrigger className="ml-4" />
        <div className="ml-auto flex items-center gap-4">
          <Button asChild variant="outline">
            <Link to={roomId ? `/polls/new?roomId=${roomId}` : "/polls/new"}>
              New Poll
            </Link>
          </Button>

          <Button asChild variant="outline">
            <Link to="/rooms/new">New Room</Link>
          </Button>
          <NotificationsDropdown />
          <MenuDropdown variant="avatar" />
        </div>
      </div>
    </Menubar>
  );
}
