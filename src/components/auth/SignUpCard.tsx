import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button"
import { Link } from "react-router"

export default function SignUpCard() {
  return (
	<div className="flex items-center justify-center min-h-screen">
		<Card className="w-[400px]">
			<CardHeader className="text-center">
				<CardTitle className="text-3xl">New here ?</CardTitle>
		  		    <p className="text-sm text-muted-foreground">
    					Join us, create polls and share with your pears
 					</p>
		</CardHeader>

		<CardContent>
			<div className="space-y-4">
				<Button asChild className="w-full mt-4" >
					<Link to="/register">
    					Sign Up
  					</Link>
				</Button>
			</div>
		</CardContent>
	  </Card>
	</div>
  );
}
