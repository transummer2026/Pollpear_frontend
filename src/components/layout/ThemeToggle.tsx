import { Moon, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useThemeToggle } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

type ThemeToggleProps = {
  className?: string;
  /** the footer only has room for the icon, menus want the wording */
  showLabel?: boolean;
};

/**
 * The theme switch, wherever it appears. The preference is stored on the user,
 * so the toggle is disabled while the change is in flight — the state it shows
 * is the server's, not a local guess.
 */
export function ThemeToggle({
  className,
  showLabel = false,
}: ThemeToggleProps) {
  const { isDark, setDark, isMutating } = useThemeToggle();

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {isDark ? <Moon className="size-4" /> : <Sun className="size-4" />}
      {showLabel && <span className="text-sm">Theme</span>}

      <Switch
        checked={isDark}
        onCheckedChange={setDark}
        disabled={isMutating}
        aria-label="Toggle dark mode"
      />
    </div>
  );
}
