import { Menu } from "lucide-react";
import { Link } from "react-router"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function MenuDropdownGuest() {
	return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Menu />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="start">
        <DropdownMenuItem> <Link to="/auth/new">Register</Link> </DropdownMenuItem>
        <DropdownMenuItem> <Link to="/auth/login">Login</Link> </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
	)
}

