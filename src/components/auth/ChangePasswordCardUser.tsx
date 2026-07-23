import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Link } from "react-router"

export default function ChangePasswordCardUser() {
  return (
      <Card className="max-w-xl mx-auto w-full text-center">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Change your password</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
              Change your mind ? {" "}
              <Link to="/feed" className="hover:underline font-bold">
                Close window 
              </Link>
            </CardDescription>
			  </CardHeader>
        <Separator />
        <div className="grid md:grid-cols-1">
          <CardContent className="p-6 border-b md:border-b-0 md:border-r p-6 space-y-4">
            <div className="m-4">
              <Input type="password" placeholder="Old Password" />
            </div>
            <div className="m-4">
              <Input type="password" placeholder="New Password" />
            </div>
            <div className="m-4">
              <Input type="password" placeholder="Confirm Password" />

            </div>
            <Button type="submit" className="m-4">Change your Password</Button>
          
          </CardContent>
        </div>
      </Card>
  );
}