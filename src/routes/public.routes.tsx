import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import LegalPage from "../pages/LegalPage";
import ContactPage from "../pages/ContactPage";
import HomePage from "../pages/HomePage";
import PrivacyPage from "../pages/PrivacyPage";
import PasswordForgotPage from "@/pages/PasswordForgotPage";

export const publicRoutes = [
	{
		path: "/login",
		element: <LoginPage />,
	},
	{
		path: "/register",
		element: <RegisterPage />,
	},
	{
		path: "/legal",
		element: <LegalPage />,
	},
	{
		path: "/privacy",
		element: <PrivacyPage />,
	},
	{
		path: "/contact",
		element: <ContactPage />,
	},
	{
		path: "/",
		element: <HomePage />,
	},
		{
		path: "/password-forgot",
		element: <PasswordForgotPage />,
	},
];