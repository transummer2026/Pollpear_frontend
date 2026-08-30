import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileBottomNav from "@/components/layout/MobileNav/MobileBottomNav";
import MobileMenuMe from "@/components/layout/MobileNav/MobileMenuMe";
import ScrollToTopButton from "@/components/layout/MobileNav/ScrollToTopButton";
import { NavbarSearchProvider } from "@/components/layout/NavbarSearch/NavbarSearchProvider";
import { useAuth } from "@/hooks/auth/use-auth";
import { useLocation } from "react-router";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const { isAuthenticated } = useAuth();
  const { pathname } = useLocation();
  const isProfile = pathname === "/me";

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    );
  }

  return (
    <NavbarSearchProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        {isProfile && <MobileMenuMe />}
        <main className="flex-1">{children}</main>
        <Footer className="hidden md:block" />
        <div
          aria-hidden
          className="h-14 shrink-0 pb-[env(safe-area-inset-bottom)] md:hidden"
        />
        {isProfile && <ScrollToTopButton />}
        <MobileBottomNav />
      </div>
    </NavbarSearchProvider>
  );
}
