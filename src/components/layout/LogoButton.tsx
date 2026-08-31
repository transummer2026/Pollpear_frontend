import { Link } from "react-router";
import logo from "@/assets/avatars/default-2.svg";

type LogoButtonProps = {
  to?: string;
};

export function LogoButton({ to = "/" }: LogoButtonProps) {
  return (
    <Link to={to}>
      <img
        src={logo}
        alt="Pollpear home"
        className="h-10 w-10 rounded-full object-cover cursor-pointer"
      />
    </Link>
  );
}
