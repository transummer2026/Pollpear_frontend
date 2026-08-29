import type { ReactNode } from "react";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

type PanelMobileRowProps<T> = {
  title: string;
  items: T[];
  /** collapsed preview, usually an AvatarGroup, opens the full list on tap */
  bubbles: ReactNode;
  getKey: (item: T) => number;
  renderItem: (item: T) => ReactNode;
};

/**
 * One line of the mobile side panel: category on the left, bubbles on the
 * right. Keeps a section down to a single row whatever the number of items.
 */
export function PanelMobileRow<T>({
  title,
  items,
  bubbles,
  getKey,
  renderItem,
}: PanelMobileRowProps<T>) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
      <span className="font-heading text-sm font-medium">{title}</span>

      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="cursor-pointer"
            aria-label={`Open ${title}`}
          >
            {bubbles}
          </button>
        </PopoverTrigger>

        <PopoverContent align="end" className="w-64 p-0">
          <PopoverHeader className="text-center py-3">{title}</PopoverHeader>
          <ScrollArea className="h-72">
            <ul className="space-y-1 p-2">
              {items.map((item) => (
                <li key={getKey(item)}>{renderItem(item)}</li>
              ))}
            </ul>
          </ScrollArea>
        </PopoverContent>
      </Popover>
    </div>
  );
}
