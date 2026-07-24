import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { Moon } from "lucide-react";

export default function DarkModeSection() {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex items-center gap-2">
        <Moon size={18} />
        <span>Dark mode</span>
      </div>

      <Switch checked={darkMode} onCheckedChange={setDarkMode} />
    </div>
  );
}
