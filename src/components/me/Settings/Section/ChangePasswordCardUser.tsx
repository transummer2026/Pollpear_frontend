import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ApiError } from "@/lib/fetcher";
import {
  type UserChangePasswordDTO,
  UserChangePasswordSchema,
} from "@shared/schemas/auth.schema";
import { usePasswordChange } from "@/hooks/me/use-password-change";

export default function ChangePasswordCardUser() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<UserChangePasswordDTO>({
    resolver: zodResolver(UserChangePasswordSchema),
  });

  const { trigger, isMutating } = usePasswordChange();

  const onSubmit: SubmitHandler<UserChangePasswordDTO> = async (data) => {
    try {
      await trigger(data);
      toast.success("Password changed successfully");
    } catch (e) {
      if (e instanceof ApiError) toast.error(e.message);
      else toast.error("An unknown error occurred");
    }
  };

  return (
    <>
      <CardHeader className="">
        <CardTitle className="text-2xl">Change your password</CardTitle>
      </CardHeader>
      <div className="grid md:grid-cols-1">
        <CardContent className="p-6 border-b md:border-b-0 md:border-r p-6 space-y-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="m-4">
              <Input
                type="password"
                placeholder="Password"
                {...register("oldPassword")}
              />
              {errors.password && (
                <p className="text-destructive text-sm mt-1">
                  {errors.oldPassword?.message}
                </p>
              )}
            </div>
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
            <Button type="submit" className="m-4" disabled={isMutating}>
              Change your Password
            </Button>
          </form>
        </CardContent>
      </div>
    </>
  );
}
