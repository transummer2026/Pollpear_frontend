import NavbarUser from "@/components/layout/NavbarUser";
import NavbarGuest from "@/components/layout/NavbarGuest";
import { useAuth } from "@/hooks/auth/use-auth";

export default function Navbar() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <NavbarUser /> : <NavbarGuest />;
}
