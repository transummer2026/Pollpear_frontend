import { toast } from "sonner";
import type { VariantProps } from "class-variance-authority";

import type { ApiKeyDTO } from "@shared/schemas/api-key.schema";
import type { buttonVariants } from "@/components/ui/button";
import { ApiError } from "@/lib/fetcher";

export type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];

export type ConfirmCopy = { title: string; description: string };

/** Dates in the reader's own locale — a key's lifetime is read, not computed. */
export function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * The one line under the section heading, covering all four states a key can be
 * in. Kept here rather than inline so the loading and failed cases cannot be
 * forgotten: without a key, "you have none" and "we could not tell" look the
 * same on screen but mean very different things.
 */
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

/** The shared failure toast for this page: the API's message when it gave one. */
export function reportError(e: unknown) {
  if (e instanceof ApiError) toast.error(e.message);
  else toast.error("An unknown error occurred");
}
