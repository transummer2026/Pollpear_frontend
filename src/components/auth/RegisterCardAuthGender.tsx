import { Controller, type UseFormRegister, type FieldErrors, type Control } from "react-hook-form";
import { type RegisterDTO } from "@shared/schemas/auth.schema";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function RegisterCardAuthGender({ 
  errors, 
  control 
} : { 
  register: UseFormRegister<RegisterDTO>; 
  errors: FieldErrors<RegisterDTO>; 
  control: Control<RegisterDTO> 
}) {
  return (
    <div>
      <Controller
      name="gender"
      control={control}
      render={({ field }) => (
        <Select onValueChange={field.onChange} value={field.value}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Gender"/>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
              <SelectItem value="prefer_not_to_say">I'd rather not say</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
      />
      {errors.gender && <span className="text-destructive text-sm mt-1">{errors.gender.message}</span>}
    </div>
  );
}