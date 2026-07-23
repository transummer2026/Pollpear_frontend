import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Link } from "react-router"
import { useForm, type SubmitHandler } from "react-hook-form";
import { type PasswordForgotDTO, PasswordForgotSchema } from "@shared/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ApiError } from "@/lib/fetcher";
import { useSWRConfig } from "swr";
import { useNavigate } from "react-router";
import { usePasswordForgot } from "@/hooks/auth/use-password-forgot";

export default function ResetPasswordCard() {

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<PasswordForgotDTO>({
    resolver: zodResolver(PasswordForgotSchema),
  });
	const { mutate } = useSWRConfig();

  const { trigger, isMutating } = usePasswordForgot();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<PasswordForgotDTO> = async (data) => {
    try {
      const user = await trigger(data);
			await mutate("/me", user, {revalidate: false}); //remise a jour du cache sur le me
      navigate("/change-password", { replace: true });
    } catch (e) {
      if (e instanceof ApiError) toast.error(e.message);
      else toast.error("An unknown error occurred");
    }
  };

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input 
              type="email" 
              placeholder="Enter your email" 
              {...register("email")}
              />
              {errors.email && (
                <p className="text-destructive text-sm mt-1">
                  {errors.email?.message}
                </p>
              )}
              <Button type="submit" className="m-6" disabled={isMutating}>
                  Reset your password
              </Button>
          </form>
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