import { Link } from "react-router";
import logo from "@/assets/pwar.jpg";

type LogoButtonProps = {
  to?: string;
};

export function LogoButton({ to = "/" }: LogoButtonProps) {
  return (
    <Link to={to}>
      <img
        src={logo}
        alt="Logo"
        className="h-10 w-10 rounded-full object-cover cursor-pointer"
      />
    </Link>
  );
}
