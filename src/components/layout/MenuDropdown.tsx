import { ChevronDown, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NavbarSearchTrigger } from "@/components/layout/NavbarSearch/NavbarSearchTrigger";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { useLogout } from "@/hooks/auth/use-logout";
import { useMe } from "@/hooks/user/use-me";
import { toast } from "sonner";
import { ApiError } from "@/lib/fetcher";

type MenuDropdownProps = {
  /**
   * Which trigger to hang the menu off: the profile picture on desktop,
   * a burger icon on mobile. The entries differ slightly too — the burger
   * carries the search and the profile link, which the desktop navbar already
   * shows on its own.
   */
  variant?: "burger" | "avatar";
};

/**
 * The account menu, and the only way out of the session. Logging out navigates
 * with `replace` so the back button cannot return to a page that now has no
 * data behind it.
 */
export function MenuDropdown({ variant = "burger" }: MenuDropdownProps) {
  const { trigger, isMutating } = useLogout();
  const { data: user } = useMe();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await trigger();
      navigate("/auth/login", { replace: true });
    } catch (e) {
      if (e instanceof ApiError) toast.error(e.message);
      else toast.error("An unknown error occurred");
    }
  };

  const isAvatar = variant === "avatar";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="outline-none"
        aria-label={isAvatar ? "Open profile menu" : "Open menu"}
      >
        {isAvatar ? (
          <div className="relative cursor-pointer">
            <Avatar size="lg">
              <AvatarImage src={user?.avatarUrl} alt="my avatar" />
              <AvatarFallback>
                {user?.username?.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="absolute -right-0.5 -bottom-0.5 z-10 flex size-4 items-center justify-center rounded-full bg-background ring-1 ring-border">
              <ChevronDown className="size-3 text-muted-foreground" />
            </span>
          </div>
        ) : (
          <Menu />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={isAvatar ? "w-56" : "w-40"}
        align={isAvatar ? "end" : "start"}
      >
        {isAvatar ? (
          <>
            <Link to="/me" className="block w-full">
              <DropdownMenuItem className="gap-2 py-2">
                <Avatar>
                  <AvatarImage src={user?.avatarUrl} alt="my avatar" />
                  <AvatarFallback>
                    {user?.username?.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="truncate font-medium">{user?.username}</span>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
          </>
        ) : (
          <>
            <NavbarSearchTrigger className="mb-2 w-full" />
            <Link to="/me" className="block w-full">
              <DropdownMenuItem>Profile</DropdownMenuItem>
            </Link>
          </>
        )}
        <Link to="/settings" className="block w-full">
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </Link>
        <Link to="/contact" className="block w-full">
          <DropdownMenuItem>Support</DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <Link to="/rooms/new" className="block w-full">
          <DropdownMenuItem>New Room</DropdownMenuItem>
        </Link>
        <Link to="/polls/new" className="block w-full">
          <DropdownMenuItem>New Poll</DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        {/* keeps the menu open, so flipping the theme can be seen right away */}
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <ThemeToggle showLabel className="w-full justify-between" />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout} disabled={isMutating}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
