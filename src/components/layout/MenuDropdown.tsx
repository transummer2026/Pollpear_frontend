import { Input } from "@/components/ui/input";
import { Menu } from "lucide-react";
import { Link } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function MenuDropdown() {
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
        <Link to="/auth/login" className="block w-full">
          <DropdownMenuItem>Log out</DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
