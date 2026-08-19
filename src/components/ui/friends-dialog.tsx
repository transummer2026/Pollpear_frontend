import type { ReactNode } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { SquareArrowExpand01Icon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PaginationControls } from "@/components/ui/pagination-controls";
import { usePagination } from "@/hooks/use-pagination";

const DIALOG_PAGE_SIZE = 8;

type FriendsDialogProps<T> = {
  title: string;
  items: T[];
  getKey: (item: T) => number;
  renderItem: (item: T) => ReactNode;
};

export function FriendsDialog<T>({
  title,
  items,
  getKey,
  renderItem,
}: FriendsDialogProps<T>) {
  const { page, setPage, pageCount, pageItems } = usePagination(
    items,
    DIALOG_PAGE_SIZE,
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label={`Expand ${title}`}
        >
          <HugeiconsIcon icon={SquareArrowExpand01Icon} strokeWidth={2} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-center">{title}</DialogTitle>
        </DialogHeader>
        <ul className="space-y-1">
          {pageItems.map((item) => (
            <li key={getKey(item)}>{renderItem(item)}</li>
          ))}
        </ul>
        <PaginationControls
          page={page}
          pageCount={pageCount}
          onPageChange={setPage}
        />
      </DialogContent>
    </Dialog>
  );
}
