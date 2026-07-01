import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button"
import { Link } from "react-router"

export default function SignUpCard() {
  return (
		<Card>
			<CardHeader className="text-center">
				<CardTitle className="text-3xl">New here ?</CardTitle>
		  		<CardDescription className="text-sm text-muted-foreground">
						Join us, create polls and share with your pears
 					</CardDescription>
			</CardHeader>
			<CardContent>
				<Button asChild className="w-full" >
					<Link to="/register">
						Sign Up
  				</Link>
				</Button>
			</CardContent>
		</Card>
  );
}
