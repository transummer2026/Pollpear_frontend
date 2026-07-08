import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import { Link } from "react-router"

export default function LoginCard() {
	return (
		<Card>
			<CardHeader className="text-center">
				<CardTitle className="text-2xl"> 
					Welcome back !
				</CardTitle>
				<CardDescription className="text-sm text-muted-foreground">
					Login to your account
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="p-4 flex justify-between">
					<Button variant="outline" className="flex-1 w-1/3 mr-4">GitHub</Button>
					<Button variant="outline" className="flex-1 w-1/3">42</Button>
					<Button variant="outline" className="flex-1 w-1/3 ml-4">Google</Button>
				</div>
				<div className="space-y-4">
					<Input type="email" placeholder="Email" />
					<Input type="password" placeholder="Password" />
					<Button className="w-full mt-4">Sign in</Button>
					<div className="text-right">
						<Link to="/auth/password-forgot"
							className="text-sm text-gray-500 hover:underline" >
							Forgot your password?
						</Link>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
