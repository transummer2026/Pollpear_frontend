import { Input } from "@/components/ui/input";
import {
  type UseFormRegister,
  type FieldErrors,
  type Control,
} from "react-hook-form";
import {
  RegisterSchema,
  type RegisterInput,
} from "@shared/schemas/auth.schema";
import ProfileCardGender from "@/components/me/ProfileCardGender";
import ProfileCardBirthdate from "@/components/me/ProfileCardBirthdate";
import FieldMessage from "@/components/FieldMessage";
import { useFieldHints } from "@/hooks/use-field-hints";

/**
 * The required half of the signup form. Its fields show their requirements as
 * they are typed, read from the shared schema — a password rejected after
 * submission is a poor way to learn what it needed.
 */
export default function RegisterCardAuth({
  register,
  errors,
  control,
}: {
  register: UseFormRegister<RegisterInput>;
  errors: FieldErrors<RegisterInput>;
  control: Control<RegisterInput>;
}) {
  const { withHints, hintsFor } = useFieldHints(RegisterSchema, control);

  return (
    <div className="p-6 border-b md:border-b-0 md:border-r p-6 space-y-4">
      <div>
        <Input
          type="text"
          placeholder="Username"
          {...withHints(register("username"))}
        />
        <FieldMessage
          hints={hintsFor("username")}
          error={errors.username?.message}
        />
      </div>
      <div>
        <Input
          type="email"
          placeholder="Email"
          {...withHints(register("email"))}
        />
        <FieldMessage hints={hintsFor("email")} error={errors.email?.message} />
      </div>
      <div>
        <Input
          type="password"
          placeholder="Password"
          {...withHints(register("password"))}
        />
        <FieldMessage
          hints={hintsFor("password")}
          error={errors.password?.message}
        />
      </div>
      <div>
        <Input
          type="password"
          placeholder="Confirm Password"
          {...withHints(register("confirmPassword"))}
        />
        <FieldMessage
          hints={hintsFor("confirmPassword")}
          error={errors.confirmPassword?.message}
        />
      </div>
      <ProfileCardBirthdate errors={errors} control={control} />
      <div>
        <Input
          placeholder="Nationality"
          {...withHints(register("nationality"))}
        />
        <FieldMessage
          hints={hintsFor("nationality")}
          error={errors.nationality?.message}
        />
      </div>
      <div>
        <ProfileCardGender errors={errors} control={control} />
      </div>
    </div>
  );
}
