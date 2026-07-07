import { Input } from "@/components/ui/input";
import { type UseFormRegister, type FieldErrors, type Control } from "react-hook-form";
import { type RegisterInput } from "@shared/schemas/auth.schema";
import RegisterCardAuthGender from "./RegisterCardAuthGender";

export default function RegisterCardAuth({
	register,
	errors,
	control
}: {
	register: UseFormRegister<RegisterInput>;
	errors: FieldErrors<RegisterInput>;
	control: Control<RegisterInput>;
}) {
	return (
		<div className="p-6 border-b md:border-b-0 md:border-r p-6 space-y-4">
			<div>
				<Input type="text" placeholder="Username" {...register("username")} />
				{errors.username && <p className="text-destructive text-sm mt-1">{errors.username.message}</p>}
			</div>
			<div>
				<Input type="email" placeholder="Email" {...register("email")} />
				{errors.email && <span className="text-destructive text-sm mt-1">{errors.email?.message}</span>}
			</div>
			<div>
				<Input type="password" placeholder="Password" {...register("password")} />
				{errors.password && <span className="text-destructive text-sm mt-1">{errors.password?.message}</span>}
			</div>
			<div>
				<Input type="password" placeholder="Confirm Password" {...register("confirmPassword")} />
				{errors.confirmPassword && <span className="text-destructive text-sm mt-1">{errors.confirmPassword?.message}</span>}
			</div>
			<div>
				<Input type="date" {...register("birthdate")} />
				{errors.birthdate && <span className="text-destructive text-sm mt-1">{errors.birthdate?.message}</span>}
			</div>
			<div>
				<Input placeholder="Nationality" {...register("nationality")} />
				{errors.nationality && <span className="text-destructive text-sm mt-1">{errors.nationality?.message}</span>}
			</div>
			<div>
				<RegisterCardAuthGender register={register} errors={errors} control={control} />
			</div>
		</div>
	);
}
