import NavbarUser from "@/components/layout/NavbarUser";
import NavbarGuest from "@/components/layout/NavbarGuest";
import { useAuth } from "@/hooks/auth/use-auth";

/** Picks the navbar the visitor is entitled to; the two share nothing but the logo. */
export default function Navbar() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <NavbarUser /> : <NavbarGuest />;
}
