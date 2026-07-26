import { Switch } from "@/components/ui/switch";
import { Moon, Sun } from "lucide-react";
import { useMe, useMeUpdate } from "@/hooks/user/use-me";
import { useSWRConfig } from "swr";
import { toast } from "sonner";
import { ApiError } from "@/lib/fetcher";

export default function DarkModeSection() {
  const { data: user } = useMe();
  const { trigger } = useMeUpdate();
  const { mutate } = useSWRConfig();

  console.log("user", user?.userTheme);
  const darkMode = user?.userTheme === "dark";

  const handleCheckedChange = async (checked: boolean) => {
    try {
      console.log(checked);
      const user = await trigger({ userTheme: checked ? "dark" : "light" });
      await mutate("/me", user);
    } catch (e) {
      if (e instanceof ApiError) toast.error(e.message);
      else toast.error("An unknown error occurred");
    }
  };

  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex items-center gap-2">
        {darkMode ? <Moon size={18} /> : <Sun size={18} />}
        <span>Theme</span>
      </div>

      <Switch
        checked={darkMode}
        onCheckedChange={handleCheckedChange}
        //disabled={isMutating}
      />
    </div>
  );
}
