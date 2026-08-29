import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { POLL_FILTERS, type PollFilter } from "@/lib/poll";

const FILTER_LABELS: Record<PollFilter, string> = {
  all: "All polls",
  active: "Active polls",
  closed: "Closed polls",
};

type PollStatusFilterProps = {
  value: PollFilter;
  onChange: (value: PollFilter) => void;
};

export default function PollStatusFilter({
  value,
  onChange,
}: PollStatusFilterProps) {
  return (
    <Select
      value={value}
      onValueChange={(next) => onChange(next as PollFilter)}
    >
      <SelectTrigger size="sm" aria-label="Filter polls">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {POLL_FILTERS.map((filter) => (
          <SelectItem key={filter} value={filter}>
            {FILTER_LABELS[filter]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
