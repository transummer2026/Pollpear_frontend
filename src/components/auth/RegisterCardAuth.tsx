import { Input } from "@/components/ui/input";
import {
  type UseFormRegister,
  type FieldErrors,
  type Control,
} from "react-hook-form";
import { type RegisterInput } from "@shared/schemas/auth.schema";
import ProfileCardGender from "@/components/me/ProfileCardGender";

export default function RegisterCardAuth({
  register,
  errors,
  control,
}: {
  register: UseFormRegister<RegisterInput>;
  errors: FieldErrors<RegisterInput>;
  control: Control<RegisterInput>;
}) {
  return (
    <div className="p-6 border-b md:border-b-0 md:border-r p-6 space-y-4">
      <div>
        <Input type="text" placeholder="Username" {...register("username")} />
        {errors.username && (
          <p className="text-destructive text-sm mt-1">
            {errors.username.message}
          </p>
        )}
      </div>
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
      <div>
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
      <div>
        <Input type="date" {...register("birthdate")} />
        {errors.birthdate && (
          <p className="text-destructive text-sm mt-1">
            {errors.birthdate?.message}
          </p>
        )}
      </div>
      <div>
        <Input placeholder="Nationality" {...register("nationality")} />
        {errors.nationality && (
          <p className="text-destructive text-sm mt-1">
            {errors.nationality?.message}
          </p>
        )}
      </div>
      <div>
        <ProfileCardGender
          errors={errors}
          control={control}
        />
      </div>
    </div>
  );
}
