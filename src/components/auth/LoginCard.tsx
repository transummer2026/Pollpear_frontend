import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type LoginDTO, LoginSchema } from "@shared/schemas/auth.schema";
import { useLogin } from "@/hooks/auth/use-login";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { ApiError } from "@/lib/fetcher";
import { useSWRConfig } from "swr";

export default function LoginCard() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginDTO>({
    resolver: zodResolver(LoginSchema),
  });
	const { mutate } = useSWRConfig();

  const { trigger, isMutating } = useLogin();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginDTO> = async (data) => {
    try {
      const user = await trigger(data);
			await mutate("/me", user, {revalidate: false});
      navigate("/feed", { replace: true });
    } catch (e) {
      if (e instanceof ApiError) toast.error(e.message);
      else toast.error("An unknown error occurred");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome back !</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 flex justify-between">
            <Button
              type="button"
              variant="outline"
              className="flex-1 w-1/3 mr-4"
            >
              GitHub
            </Button>
            <Button type="button" variant="outline" className="flex-1 w-1/3">
              42
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1 w-1/3 ml-4"
            >
              Google
            </Button>
          </div>
          <div className="space-y-4">
            <div>
              <Input type="email" placeholder="Email" {...register("email")} />
              {errors.email && (
                <p className="text-destructive text-sm mt-1">
                  {errors.email?.message}
                </p>
              )}
            </div>
            <div>
              <Input
                type="password"
                placeholder="Password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-destructive text-sm mt-1">
                  {errors.password?.message}
                </p>
              )}
            </div>
            <Button type="submit" className="w-full mt-4" disabled={isMutating}>
              Sign in
            </Button>
            <div className="text-right">
              <Link
                to="/auth/password-forgot"
                className="text-sm text-gray-500 hover:underline"
              >
                Forgot your password?
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
