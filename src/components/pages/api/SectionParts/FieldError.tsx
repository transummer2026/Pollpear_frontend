/** A field's validation message, or nothing at all when it is valid. */
export default function FieldError({
  message,
}: Readonly<{ message?: string }>) {
  if (!message) return null;
  return <p className="text-destructive text-sm">{message}</p>;
}
