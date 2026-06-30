import Layout from "@/layout/Layout";
import LoginCard from "@/components/auth/LoginCard";
import SignUpCard from "@/components/auth/SignUpCard";

export default function Login() {
	return (
		<Layout>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div className="w-full max-w-l p-4">
						<SignUpCard />
					</div>

					<div className="w-full max-w-l p-4">
						<LoginCard />
					</div>
				</div>
		</Layout>
	);
}