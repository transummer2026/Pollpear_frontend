import { HugeiconsIcon } from "@hugeicons/react";
import { SearchIcon } from "@hugeicons/core-free-icons";
import { CommandShortcut } from "@/components/ui/command";
import { useSearchDialog } from "@/components/layout/NavbarSearch/search-context";
import { cn } from "@/lib/utils";

/**
 * Opens the search dialog. Looks like an input but is a button: the field the
 * user types in lives in the dialog, and duplicating it here would mean
 * keeping two of them in step.
 */
export function NavbarSearchTrigger({ className }: { className?: string }) {
  const { open } = useSearchDialog();

  return (
    <button
      type="button"
      onClick={open}
      className={cn(
        "flex h-9 w-72 items-center gap-2 rounded-4xl border border-input bg-input/30 px-3 text-sm text-muted-foreground",
        className,
      )}
    >
      <HugeiconsIcon
        icon={SearchIcon}
        strokeWidth={2}
        className="size-4 shrink-0 opacity-50"
      />
      Search...
      <CommandShortcut className="ml-auto">⌘K</CommandShortcut>
    </button>
  );
}
