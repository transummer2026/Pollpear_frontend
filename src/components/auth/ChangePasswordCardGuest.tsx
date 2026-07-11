import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Link } from "react-router"


export default function ChangePasswordCardGuest() {

  return (
      <Card className="max-w-xl mx-auto w-full text-center">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Change your password</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
              Change your mind ? {" "}
              <Link to="/auth/register" className="hover:underline font-bold">
                register 
              </Link>
              {" / "}
              <Link to="/auth/login" className="hover:underline font-bold">
                login 
              </Link>
            </CardDescription>
			  </CardHeader>
        <Separator />
        <div className="grid md:grid-cols-1">
          <CardContent className="p-6 border-b md:border-b-0 md:border-r p-6 space-y-4">
            <div>
              <Input type="password" placeholder="New Password" />

            </div>
            <div>
              <Input type="password" placeholder="Confirm Password" />

            </div>
            <Button type="submit" className="m-6">Change your Password</Button>
          </CardContent>
        </div>
      </Card>
  );
}


//   <Input type="email" placeholder="Email" {...register("email")} />
//   {errors.email && <span className="text-destructive text-sm mt-1">{errors.email?.message}</span>}
// </div>
// <div>
//   <Input type="password" placeholder="Password" {...register("password")} />
//   {errors.password && <span className="text-destructive text-sm mt-1">{errors.password?.message}</span>}
// </div>


// <Button type="submit" className="m-6" disabled={isMutating}>Sign up</Button>