import { Link, useLocation } from "react-router";
import { Notification01Icon, Search01Icon } from "@hugeicons/core-free-icons";
import logo from "@/assets/pwar.jpg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NotificationsDropdown } from "@/components/layout/NotificationsDropdown";
import { useSearchDialog } from "@/components/layout/NavbarSearch/search-context";
import { MobileNavItemBody } from "@/components/layout/MobileNav/MobileNavItem";
import { mobileNavItemClass } from "@/components/layout/MobileNav/mobile-nav-styles";
import { MobileCreateMenu } from "@/components/layout/MobileNav/MobileCreateMenu";
import { useMe } from "@/hooks/user/use-me";
import { cn } from "@/lib/utils";

type MobileBottomNavProps = {
  roomId?: number;
};

export default function MobileBottomNav({ roomId }: MobileBottomNavProps) {
  const { pathname } = useLocation();
  const { open } = useSearchDialog();
  const { data: user } = useMe();

  const isFeed = pathname === "/feed";
  const isSearch = pathname === "/search";
  const isProfile = pathname === "/me";

  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-0 bottom-0 z-50 border-t bg-background pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <div className="grid h-14 grid-cols-5">
        <Link
          to="/feed"
          aria-current={isFeed ? "page" : undefined}
          className={mobileNavItemClass(isFeed)}
        >
          <MobileNavItemBody label="Feed" active={isFeed}>
            {/* Same logo as <LogoButton /> in the desktop navbar. */}
            <img
              src={logo}
              alt=""
              className={cn(
                "size-7 rounded-full object-cover",
                isFeed &&
                  "ring-2 ring-primary ring-offset-2 ring-offset-background",
              )}
            />
          </MobileNavItemBody>
        </Link>

        <button
          type="button"
          onClick={open}
          aria-current={isSearch ? "page" : undefined}
          className={mobileNavItemClass(isSearch)}
        >
          <MobileNavItemBody
            icon={Search01Icon}
            label="Search"
            active={isSearch}
          />
        </button>

        <MobileCreateMenu roomId={roomId} />

        {/* Full-width panel so it reads as centred on screen rather than
            hanging off the fourth tab. */}
        <NotificationsDropdown
          side="top"
          align="center"
          sideOffset={12}
          collisionPadding={12}
          className="w-[calc(100vw-1.5rem)] max-w-sm"
        >
          <button
            type="button"
            aria-label="Notifications"
            className={mobileNavItemClass(false)}
          >
            <MobileNavItemBody icon={Notification01Icon} label="Notifs" />
          </button>
        </NotificationsDropdown>

        <Link
          to="/me"
          aria-current={isProfile ? "page" : undefined}
          className={mobileNavItemClass(isProfile)}
        >
          <MobileNavItemBody label="Profile" active={isProfile}>
            <Avatar
              className={cn(
                "size-7",
                isProfile &&
                  "ring-2 ring-primary ring-offset-2 ring-offset-background",
              )}
            >
              <AvatarImage src={user?.avatarUrl} alt="" />
              <AvatarFallback className="text-[10px]">
                {user?.username?.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </MobileNavItemBody>
        </Link>
      </div>
    </nav>
  );
}
