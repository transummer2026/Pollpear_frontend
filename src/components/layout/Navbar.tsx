import NavbarUser from "@/components/layout/NavbarUser";
import NavbarGuest from "@/components/layout/NavbarGuest";
import { useAuth } from "@/hooks/auth/use-auth";

type NavbarProps = {
  roomId?: number;
};

export default function Navbar({ roomId }: NavbarProps) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <NavbarUser roomId={roomId} /> : <NavbarGuest />;
}
