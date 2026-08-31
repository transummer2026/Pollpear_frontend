import { useMemo, useState } from "react";
import {
  useWatch,
  type Control,
  type FieldValues,
  type Path,
  type UseFormRegisterReturn,
} from "react-hook-form";
import { type ZodType } from "zod";

function hasInput(value: unknown) {
  return typeof value === "string" ? value.length > 0 : value != null;
}

/**
 * Live requirement hints read straight from a Zod schema, so they can never
 * drift from the validation itself. A field lists the requirements it does not
 * meet yet, but only while it is focused and the user has typed something:
 * an untouched form stays quiet and blurring clears the hints again.
 */
export function useFieldHints<T extends FieldValues>(
  schema: ZodType,
  control: Control<T>,
) {
  const [focused, setFocused] = useState<string | null>(null);
  const values = useWatch({ control }) as Record<string, unknown>;

  const issues = useMemo(() => {
    const result = schema.safeParse(values);
    if (result.success) return {} as Record<string, string[]>;
    return result.error.issues.reduce<Record<string, string[]>>(
      (byField, issue) => {
        const field = String(issue.path[0] ?? "");
        if (field) (byField[field] ??= []).push(issue.message);
        return byField;
      },
      {},
    );
  }, [schema, values]);

  return {
    /** Wraps a `register(...)` result so focus and blur drive the hints. */
    withHints: (registration: UseFormRegisterReturn) => ({
      ...registration,
      onFocus: () => setFocused(registration.name),
      onBlur: (event: React.FocusEvent<HTMLInputElement>) => {
        setFocused(null);
        return registration.onBlur(event);
      },
    }),
    hintsFor: (name: Path<T>) =>
      focused === name && hasInput(values[name]) ? (issues[name] ?? []) : [],
  };
}
