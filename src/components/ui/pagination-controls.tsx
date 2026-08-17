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
  const start = Math.max(2, page - siblings);
  const end = Math.min(pageCount - 1, page + siblings);

  const range: (number | "ellipsis")[] = [1];
  if (start > 2) range.push("ellipsis");
  for (let i = start; i <= end; i++) range.push(i);
  if (end < pageCount - 1) range.push("ellipsis");
  if (pageCount > 1) range.push(pageCount);

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
      <PaginationContent>
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
