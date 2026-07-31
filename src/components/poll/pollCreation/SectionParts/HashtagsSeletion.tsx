import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { UseFormWatch, UseFormSetValue } from "react-hook-form";
import type { PollFormValues } from "../pollForm";

type HashtagsSelectionProps = {
  watch: UseFormWatch<PollFormValues>;
  setValue: UseFormSetValue<PollFormValues>;
};

export default function HashtagsSelection({
  watch,
  setValue,
}: HashtagsSelectionProps) {
  const hashtags = watch("hashtags") ?? [];
  const [tagInput, setTagInput] = useState("");

  const addHashtag = () => {
    const cleaned = tagInput.replace("#", "").replace(/\s+/g, "");
    if (
      cleaned &&
      hashtags.length < 5 &&
      !hashtags.some((tag) => tag.name === cleaned)
    ) {
      setValue("hashtags", [...hashtags, { name: cleaned }]);
      setTagInput("");
    }
  };

  const removeHashtag = (name: string) => {
    setValue(
      "hashtags",
      hashtags.filter((tag) => tag.name !== name),
    );
  };

  return (
    <div className="space-y-3">
      <Label>Hashtags ({hashtags.length}/5)</Label>

      <div className="flex gap-2">
        <Input
          placeholder="#sport"
          value={tagInput}
          disabled={hashtags.length >= 5}
          onChange={(e) => {
            let value = e.target.value;

            if (!value.startsWith("#")) {
              value = "#" + value;
            }

            setTagInput(value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addHashtag();
            }
          }}
        />

        <Button
          type="button"
          variant="outline"
          onClick={addHashtag}
          disabled={hashtags.length >= 5}
        >
          Add
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {hashtags.map((tag) => (
          <button
            key={tag.name}
            type="button"
            onClick={() => removeHashtag(tag.name)}
            className="rounded-full bg-muted px-3 py-1 text-sm"
          >
            #{tag.name}
          </button>
        ))}
      </div>
    </div>
  );
}
