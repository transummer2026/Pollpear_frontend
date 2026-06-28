import NavbarUser from "@/components/layout/NavbarUser";
import NavbarGuest from "@/components/layout/NavbarGuest";

//temporary function, waiting for backend connection
const isLogged = () => {
	return true;
};

export default function Navbar() {
	const user = isLogged();
	return user ? <NavbarUser /> : <NavbarGuest />;
}