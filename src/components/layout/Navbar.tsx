import NavbarUser from "@/components/layout/NavbarUser";
import NavbarGuest from "@/components/layout/NavbarGuest";
import { useAuth } from "@/hooks/auth/use-auth";

const isLogged = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated;
};

export default function Navbar() {
  const user = isLogged();
  return user ? <NavbarUser /> : <NavbarGuest />;
}
