import { Input } from "@/components/ui/input";
import { type UseFormRegister, type FieldErrors } from "react-hook-form";
import { type RegisterInput } from "@shared/schemas/auth.schema";

export default function RegisterCardInfos({
  register,
  errors,
}: {
  register: UseFormRegister<RegisterInput>;
  errors: FieldErrors<RegisterInput>;
}) {
  return (
    <div className="p-6 space-y-4">
      <div>
        <Input placeholder="First name (optional)" {...register("name")} />
        {errors.name && (
          <p className="text-destructive text-sm mt-1">
            {errors.name?.message}
          </p>
        )}
      </div>
      <div>
        <Input placeholder="Last name (optional)" {...register("surname")} />
        {errors.surname && (
          <p className="text-destructive text-sm mt-1">
            {errors.surname?.message}
          </p>
        )}
      </div>
      <div>
        <Input placeholder="City (optional)" {...register("city")} />
        {errors.city && (
          <p className="text-destructive text-sm mt-1">
            {errors.city?.message}
          </p>
        )}
      </div>
      <div>
        <Input placeholder="State (optional)" {...register("state")} />
        {errors.state && (
          <p className="text-destructive text-sm mt-1">
            {errors.state?.message}
          </p>
        )}
      </div>
      <div>
        <Input placeholder="Country (optional)" {...register("country")} />
        {errors.country && (
          <p className="text-destructive text-sm mt-1">
            {errors.country?.message}
          </p>
        )}
      </div>
      <div>
        <Input placeholder="Company (optional)" {...register("company")} />
        {errors.company && (
          <p className="text-destructive text-sm mt-1">
            {errors.company?.message}
          </p>
        )}
      </div>
    </div>
  );
}
