import LoginCard from "@/components/auth/LoginCard";
import SignUpCard from "@/components/auth/SignUpCard";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Login() {
	return (
		<div className="min-h-screen flex flex-col">
			<Navbar />

			<main className="flex-1">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div className="w-full max-w-l p-4">
						<SignUpCard />
					</div>

					<div className="w-full max-w-l p-4">
						<LoginCard />
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
}