import { Input } from "@/components/ui/input";
import { Menu } from "lucide-react";
import { Link, useNavigate } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogout } from "@/hooks/auth/use-logout";
import { toast } from "sonner";
import { ApiError } from "@/lib/fetcher";

export function MenuDropdown() {
  const { trigger, isMutating } = useLogout();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await trigger();
      navigate("auth/login", { replace: true });
    } catch (e) {
      if (e instanceof ApiError) toast.error(e.message);
      else toast.error("An unknown error occurred");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Menu />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="start">
        <Input className="mb-2" placeholder="Search..." />
        <Link to="/me" className="block w-full">
          <DropdownMenuItem>Profile</DropdownMenuItem>
        </Link>
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
        <DropdownMenuItem onClick={handleLogout} disabled={isMutating}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
