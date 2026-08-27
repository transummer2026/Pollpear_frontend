import { Link } from "react-router";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  PlusSignIcon,
  ChartBarLineIcon,
  UserGroupIcon,
} from "@hugeicons/core-free-icons";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { MobileNavItemBody } from "@/components/layout/MobileNav/MobileNavItem";
import { mobileNavItemClass } from "@/components/layout/MobileNav/mobile-nav-styles";

type MobileCreateMenuProps = {
  roomId?: number;
};

/**
 * The "Create" tab. The navigation menu content is anchored to the bottom of
 * the trigger (`bottom-full`) instead of shadcn's default `top-full`, which
 * would render it off-screen below the bar.
 */
export function MobileCreateMenu({ roomId }: MobileCreateMenuProps) {
  return (
    <NavigationMenu
      viewport={false}
      delayDuration={0}
      className="max-w-none flex-none"
    >
      <NavigationMenuList className="h-full w-full">
        <NavigationMenuItem className="h-full w-full">
          <NavigationMenuTrigger
            className={mobileNavItemClass(
              false,
              "hover:bg-transparent focus:bg-transparent data-open:bg-transparent data-popup-open:bg-transparent [&>svg]:hidden",
            )}
          >
            <MobileNavItemBody icon={PlusSignIcon} label="Create" />
          </NavigationMenuTrigger>
          <NavigationMenuContent className="absolute! top-auto! bottom-full! left-1/2 mt-0! mb-3 w-52! -translate-x-1/2">
            <ul className="flex flex-col gap-1">
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    to={roomId ? `/polls/new?roomId=${roomId}` : "/polls/new"}
                  >
                    <HugeiconsIcon icon={ChartBarLineIcon} strokeWidth={2} />
                    New Poll
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link to="/rooms/new">
                    <HugeiconsIcon icon={UserGroupIcon} strokeWidth={2} />
                    New Room
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
