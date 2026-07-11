import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Link } from "react-router"


export default function ResetPasswordCard() {

  return (
      <Card className="max-w-xl mx-auto w-full text-center">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Reset your password</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Enter the email address you used to create your account with
            </CardDescription>
			  </CardHeader>
        <Separator />
        <div className="grid md:grid-cols-1">
        <CardContent>
          <Input type="email" placeholder="Enter your email" />
            <Button type="submit" className="m-6">
              <Link to="/auth/change-password">
                Reset your password
              </Link>
            </Button>
          <CardDescription className="text-sm text-muted-foreground">
              Don't have an acccount ? {" "}
              <Link to="/auth/register" className="hover:underline font-bold">
                sign up
              </Link>
            </CardDescription>
        </CardContent>
        </div>
        
        
      </Card>
  );
}


// import { useForm, type SubmitHandler } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { type RegisterDTO, RegisterSchema } from "@shared/schemas/auth.schema"
// import { useRegister } from "@/hooks/auth/use-register";

  // const {
  //   register,
  //   control,
  //   formState: { errors },
  //   handleSubmit,
  // } = useForm<RegisterDTO>({
  //   resolver: zodResolver(RegisterSchema),
  // })

  // const { trigger, isMutating } = useRegister()

  // const onSubmit: SubmitHandler<RegisterDTO> = async (data) => {
  //   try {
  //     const res = await trigger(data)
  //     console.log("Success: ", res)
  //   } catch (e) {
  //     console.error("Error: ", e)
  //   }
  // }

  // <Button type="submit" className="m-6" disabled={isMutating}>Sign up</Button>

  // <form onSubmit={handleSubmit(onSubmit)}>

  // </form>