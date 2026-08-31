/**
 * Feedback under a form field: the greyed-out requirements still to meet while
 * the user types, or the validation error once the form has been submitted.
 * Only one of the two shows at a time, so the same rule is never stated twice.
 */
export default function FieldMessage({
  hints,
  error,
}: {
  hints: string[];
  error?: string;
}) {
  if (hints.length)
    return (
      <ul className="mt-1 space-y-0.5">
        {hints.map((hint) => (
          <li key={hint} className="text-muted-foreground text-xs">
            {hint}
          </li>
        ))}
      </ul>
    );
  if (error) return <p className="text-destructive text-sm mt-1">{error}</p>;
  return null;
}
