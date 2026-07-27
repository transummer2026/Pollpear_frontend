import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const languages = [
  {
    code: "FRA",
    value: "fr",
    label: "Français",
  },
  {
    code: "ENG",
    value: "en",
    label: "English",
  },
];

interface LanguageSectionProps {
  value: string;
  onChange: (value: string) => void;
}

export default function LanguageSection({
  value,
  onChange,
}: LanguageSectionProps) {
  return (
    <div className="space-y-2">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue>
            {languages.find((lang) => lang.value === value)?.code}
          </SelectValue>
        </SelectTrigger>

        <SelectContent>
          {languages.map((language) => (
            <SelectItem key={language.value} value={language.value}>
              <div className="flex items-center justify-between w-full gap-4">
                <span>{language.label}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
