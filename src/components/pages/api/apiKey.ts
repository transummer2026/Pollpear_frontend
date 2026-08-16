import { toast } from "sonner";
import type { VariantProps } from "class-variance-authority";

import type { ApiKeyDTO } from "@shared/schemas/api-key.schema";
import type { buttonVariants } from "@/components/ui/button";
import { ApiError } from "@/lib/fetcher";

export type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];

export type ConfirmCopy = { title: string; description: string };

export function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function describeState(
  isLoading: boolean,
  failed: boolean,
  apiKey: ApiKeyDTO | null | undefined,
) {
  if (isLoading) return "Checking whether you already have a key.";
  if (failed) return "Your key status could not be loaded.";
  if (apiKey)
    return "Your key is active. It is stored hashed, so it cannot be displayed again.";
  return "You do not have an API key yet.";
}

export function reportError(e: unknown) {
  if (e instanceof ApiError) toast.error(e.message);
  else toast.error("An unknown error occurred");
}
