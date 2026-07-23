import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { type PasswordResetDTO, PasswordResetSchema } from "@shared/schemas/auth.schema";
import { usePasswordReset } from "@/hooks/auth/use-password-reset";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApiError } from "@/lib/fetcher";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useSWRConfig } from "swr";
import { useForm, type SubmitHandler } from "react-hook-form";


export default function ChangePasswordCardGuest() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<PasswordResetDTO>({
    resolver: zodResolver(PasswordResetSchema),
  });
	const { mutate } = useSWRConfig();

  const { trigger, isMutating } = usePasswordReset();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<PasswordResetDTO> = async (data) => {
    try {
      const user = await trigger(data);
			await mutate("/me", user, {revalidate: false});
      navigate("auth/login", { replace: true });
    } catch (e) {
      if (e instanceof ApiError) toast.error(e.message);
      else toast.error("An unknown error occurred");
    }
  };

  return (
      <Card className="max-w-xl mx-auto w-full text-center">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Change your password</CardTitle>
			  </CardHeader>
        <Separator />
        <div className="grid md:grid-cols-1">
          <CardContent className="p-6 border-b md:border-b-0 md:border-r p-6 space-y-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="m-4">
                <Input 
                  type="password" 
                  placeholder="New Password"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-destructive text-sm mt-1">
                    {errors.password?.message}
                  </p>
                )}
              </div>
              <div className="m-4">
                <Input 
                  type="password"
                  placeholder="Confirm Password" 
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <p className="text-destructive text-sm mt-1">
                    {errors.confirmPassword?.message}
                  </p>
                )}
              </div>
              <Button type="submit" className="m-4" disabled={isMutating}>Change your Password</Button>
            </form>
          </CardContent>
        </div>
      </Card>
  );
}