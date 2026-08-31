import { useEffect } from "react";
import { useSWRConfig } from "swr";
import { toast } from "sonner";
import { ApiError } from "@/lib/fetcher";
import { useMe, useMeUpdate } from "@/hooks/user/use-me";
import type { UserTheme } from "@shared/prisma/schemas/enums/UserTheme.schema";

const DARK_QUERY = "(prefers-color-scheme: dark)";

function wantsDark(theme: UserTheme | undefined, systemDark: boolean): boolean {
  if (theme === "dark") return true;
  if (theme === "system") return systemDark;

  return false;
}

/**
 * Paints the app in the user's stored theme, and keeps it there. Mounted once
 * at the root: it toggles the `dark` class on <html>, which is what every
 * Tailwind `dark:` utility keys off. Falls back to light while `/me` is
 * unknown — a signed-out visitor has no stored preference.
 */
export function useApplyUserTheme() {
  const { data: user } = useMe({ shouldRetryOnError: false });
  const theme = user?.userTheme;

  useEffect(() => {
    const media = window.matchMedia(DARK_QUERY);

    const apply = () =>
      document.documentElement.classList.toggle(
        "dark",
        wantsDark(theme, media.matches),
      );

    apply();

    // only "system" has to follow the OS after the first paint
    if (theme !== "system") return;

    media.addEventListener("change", apply);

    return () => media.removeEventListener("change", apply);
  }, [theme]);
}

/**
 * Read/write side of the theme, shared by every switch in the UI so they all
 * stay in sync: they read the same `/me` cache that `useApplyUserTheme` uses.
 */
export function useThemeToggle() {
  const { data: user } = useMe();
  const { trigger, isMutating } = useMeUpdate();
  const { mutate } = useSWRConfig();

  const isDark = user?.userTheme === "dark";

  const setDark = async (checked: boolean) => {
    try {
      // the PATCH answer is authoritative, no refetch needed to repaint
      const updated = await trigger({ userTheme: checked ? "dark" : "light" });
      await mutate("/me", updated, { revalidate: false });
    } catch (e) {
      if (e instanceof ApiError) toast.error(e.message);
      else toast.error("An unknown error occurred");
    }
  };

  return { isDark, setDark, isMutating };
}
