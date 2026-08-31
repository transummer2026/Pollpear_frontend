import {
  Controller,
  type FieldErrors,
  type FieldValues,
  type Control,
  type Path,
} from "react-hook-form";
import { GenderSchema, type GenderDTO } from "@shared/schemas/users.schema";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type GenderField = {
  gender?: GenderDTO | null;
};

const GENDER_LABELS: Record<GenderDTO, string> = {
  male: "Male",
  female: "Female",
  other: "Other",
  prefer_not_to_say: "I'd rather not say",
};

/**
 * Gender select, generic over the form holding it — it is shared by the OAuth
 * signup and the settings profile form, which have little else in common.
 * Labels live here; the values come from the shared schema.
 */
export default function ProfileCardGender<T extends FieldValues & GenderField>({
  errors,
  control,
}: {
  errors: FieldErrors<T>;
  control: Control<T>;
}) {
  return (
    <div>
      <Controller
        name={"gender" as Path<T>}
        control={control}
        render={({ field }) => (
          <Select
            onValueChange={field.onChange}
            value={field.value ?? undefined}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {GenderSchema.options.map((value) => (
                  <SelectItem key={value} value={value}>
                    {GENDER_LABELS[value]}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />
      {errors.gender && (
        <span className="text-destructive text-sm mt-1">
          {String(errors.gender.message)}
        </span>
      )}
    </div>
  );
}
