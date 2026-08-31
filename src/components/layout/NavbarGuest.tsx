import { Menubar } from "@/components/ui/menubar";
import { Button } from "@/components/ui/button";
import { LogoButton } from "@/components/layout/LogoButton";
import { Link, useLocation } from "react-router";
import MenuDropdownGuest from "@/components/layout/MenuDropdownGuest";

/** Navbar for a signed-out visitor: the logo, and the two ways in. */
export default function NavbarGuest() {
  const { pathname } = useLocation();
  /* the login page already offers both, the navbar would just repeat itself */
  const isAuthPage = pathname === "/auth/login";

  return (
    <Menubar className="flex h-16 items-center px-6 border-x-0 border-t-0">
      <LogoButton />
      {!isAuthPage && (
        <div className="ml-auto hidden md:flex items-center flex-1">
          <div className="ml-auto flex items-center gap-4">
            <Button asChild variant="ghost">
              <Link to="/auth/login">Log in</Link>
            </Button>
            <Button
              asChild
              className="bg-[#325024] text-white hover:bg-[#325024]/80"
            >
              <Link to="/auth/register">Sign up</Link>
            </Button>
          </div>
        </div>
      )}
      <div className="ml-auto md:hidden">
        <MenuDropdownGuest />
      </div>
    </Menubar>
  );
}
