import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";

type PaginationControlsProps = {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  className?: string;
};

function getPageRange(
  page: number,
  pageCount: number,
): (number | "ellipsis")[] {
  const siblings = 1;
  // first + last + current + (siblings * 2) + up to 2 ellipses
  const maxVisible = siblings * 2 + 5;

  if (pageCount <= maxVisible) {
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  const start = Math.max(2, page - siblings);
  const end = Math.min(pageCount - 1, page + siblings);

  const range: (number | "ellipsis")[] = [1];

  if (start > 3) {
    range.push("ellipsis");
  } else {
    for (let i = 2; i < start; i++) range.push(i);
  }

  for (let i = start; i <= end; i++) range.push(i);

  if (end < pageCount - 2) {
    range.push("ellipsis");
  } else {
    for (let i = end + 1; i < pageCount; i++) range.push(i);
  }

  range.push(pageCount);

  return range;
}

export function PaginationControls({
  page,
  pageCount,
  onPageChange,
  className,
}: PaginationControlsProps) {
  if (pageCount <= 1) return null;

  return (
    <Pagination className={className}>
      <PaginationContent className="flex-wrap justify-center">
        <PaginationItem>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Go to previous page"
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} strokeWidth={2} />
          </Button>
        </PaginationItem>
        {getPageRange(page, pageCount).map((p, index) =>
          p === "ellipsis" ? (
            <PaginationItem key={`ellipsis-${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={p}>
              <Button
                type="button"
                variant={p === page ? "outline" : "ghost"}
                size="icon"
                aria-current={p === page ? "page" : undefined}
                onClick={() => onPageChange(p)}
              >
                {p}
              </Button>
            </PaginationItem>
          ),
        )}
        <PaginationItem>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Go to next page"
            disabled={page === pageCount}
            onClick={() => onPageChange(page + 1)}
          >
            <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
