import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"

export default function LoginCard() {
  return (
	<div className="flex items-center justify-center min-h-screen">
	  <Card className="w-[400px]">
		<CardHeader className="text-center">
		  <CardTitle className="text-3xl">Welcome back !</CardTitle>
		    <p className="text-sm text-muted-foreground">
    			Login to your account
 			</p>
		</CardHeader>

		<CardContent>
			<div className="flex gap-3 pt-2 mt-4 justify-center space-y-4">
				<Button variant="outline" className="flex-1">GitHub</Button>
				<Button variant="outline" className="flex-1">42</Button>
				<Button variant="outline" className="flex-1">Google</Button>
			</div>

			<div className="space-y-4">
				<Input type="email" placeholder="Email" />
				<Input type="password" placeholder="Password" />

				<Button className="w-full mt-4" >Sign in</Button>

				<a href="/password-forgot"
					className="text-sm text-gray-500 hover:underline" >
					Forgot your password?
				</a>
			</div>
		</CardContent>
	  </Card>
	</div>
  );
}
