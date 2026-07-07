import { Input } from "@/components/ui/input";
import { type UseFormRegister, type FieldErrors } from "react-hook-form";
import { type RegisterDTO } from "@shared/schemas/auth.schema";

export default function RegisterCardInfos({
    register , 
    errors, 
  } : { 
    register: UseFormRegister<RegisterDTO>; 
    errors: FieldErrors<RegisterDTO>; 
}) {
	return (
    <div className="p-6 space-y-4">
      <div>
        <Input placeholder="First name (optional)" {...register("name")} />
        {errors.name && <span className="text-destructive text-sm mt-1">{errors.name?.message}</span>}
      </div>
      <div>
        <Input placeholder="Last name (optional)" {...register("surname")} />
        {errors.surname && <span className="text-destructive text-sm mt-1">{errors.surname?.message}</span>}
      </div>
      <div>
        <Input placeholder="City (optional)" {...register("city")} />
        {errors.city && <span className="text-destructive text-sm mt-1">{errors.city?.message}</span>}
      </div>
      <div>
        <Input placeholder="State (optional)" {...register("state")} />
        {errors.state && <span className="text-destructive text-sm mt-1">{errors.state?.message}</span>}
      </div>
      <div>
        <Input placeholder="Country (optional)" {...register("country")} />
        {errors.country && <span className="text-destructive text-sm mt-1">{errors.country?.message}</span>}
      </div>
      <div>
        <Input placeholder="Company (optional)" {...register("company")} />
        {errors.company && <span className="text-destructive text-sm mt-1">{errors.company?.message}</span>}
      </div>
    </div>
	);
}