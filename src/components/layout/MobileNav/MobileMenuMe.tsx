import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import {
  HelpCircleIcon,
  Legal01Icon,
  Logout01Icon,
  Mail01Icon,
  Menu01Icon,
  Settings01Icon,
  Shield01Icon,
} from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { useLogout } from "@/hooks/auth/use-logout";
import { ApiError } from "@/lib/fetcher";

type MenuLink = {
  to: string;
  label: string;
  icon: IconSvgElement;
};

const ACCOUNT_LINKS: MenuLink[] = [
  { to: "/settings", label: "Settings", icon: Settings01Icon },
];

const SITE_LINKS: MenuLink[] = [
  { to: "/contact", label: "Support", icon: Mail01Icon },
  { to: "/faq", label: "FAQ", icon: HelpCircleIcon },
  { to: "/legal", label: "Legal", icon: Legal01Icon },
  { to: "/privacy", label: "Privacy", icon: Shield01Icon },
];

/**
 * Mobile-only burger. <MobileBottomNav /> carries the day-to-day navigation,
 * so everything else (settings, legal pages, log out) lives behind it —
 * mounted on /me only. Deliberately not sticky: it scrolls away with the
 * content, and <ScrollToTopButton /> brings the user back up to it.
 */
export default function MobileMenuMe() {
  const [open, setOpen] = useState(false);
  const { trigger, isMutating } = useLogout();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await trigger();
      setOpen(false);
      navigate("/auth/login", { replace: true });
    } catch (e) {
      if (e instanceof ApiError) toast.error(e.message);
      else toast.error("An unknown error occurred");
    }
  };

  const renderLink = ({ to, label, icon }: MenuLink) => (
    <SheetClose asChild key={to}>
      <Link
        to={to}
        className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm transition-colors hover:bg-muted"
      >
        <HugeiconsIcon
          icon={icon}
          strokeWidth={2}
          className="size-4 shrink-0 text-muted-foreground"
        />
        {label}
      </Link>
    </SheetClose>
  );

  return (
    <div className="flex justify-end px-4 pt-3 md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Open menu">
            <HugeiconsIcon icon={Menu01Icon} strokeWidth={2} />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-72 p-0">
          <SheetHeader className="p-4">
            <SheetTitle>Menu</SheetTitle>
            <SheetDescription className="sr-only">
              Account settings, site pages and log out
            </SheetDescription>
          </SheetHeader>

          <nav className="flex flex-col gap-1 overflow-y-auto px-2">
            {ACCOUNT_LINKS.map(renderLink)}
            <Separator className="my-2" />
            {SITE_LINKS.map(renderLink)}
          </nav>

          <SheetFooter className="gap-4 p-4">
            <ThemeToggle showLabel className="w-full justify-between px-1" />
            <Button
              variant="outline"
              className="w-full"
              onClick={handleLogout}
              disabled={isMutating}
            >
              <HugeiconsIcon icon={Logout01Icon} strokeWidth={2} />
              Log out
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              PollPear © {new Date().getFullYear()}
            </p>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
