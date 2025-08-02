"use client";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import usePagination from "@/hooks/usePagination";
import { cn, formateDateMDYT } from "@/lib/utils";
import { UsageHistoryEntry } from "@/types/profile.types";

interface UsageHistroyProps {
  usageHistory: UsageHistoryEntry[];
}
const itemPerPage = 5;
function UsageHistroy({ usageHistory }: UsageHistroyProps) {
  const {
    currentPage,
    goNextPage,
    goPrevPage,
    isFirstPage,
    isLastPage,
    goToPage,
    totalPages,
  } = usePagination({
    itemPerPage,
    totalItems: usageHistory.length,
  });
  const start = currentPage * itemPerPage - itemPerPage;
  const end = currentPage * itemPerPage;
  return (
    <div className="space-y-4">
      {usageHistory.length == 0 && (
        <div className="flex h-96 w-full items-center justify-center">
          <p className="text-muted-foreground">
            You haven&apos;t used any points
          </p>
        </div>
      )}
      {usageHistory.length > 0 &&
        usageHistory.slice(start, end).map((usage) => (
          <div
            key={usage.id}
            className="flex items-center justify-between border-b py-3 last:border-b-0"
          >
            <div className="flex-1">
              <p className="text-sm font-medium">
                {usage.order_number
                  ? `Order #${usage.order_number}`
                  : "Pending Order"}
              </p>
              {usage.used_at && (
                <p className="text-muted-foreground text-xs">
                  {formateDateMDYT(usage.used_at)}
                </p>
              )}
              <p className="text-secondary-foreground text-xs">
                Status:{" "}
                <span className="capitalize">{usage.status || "Unknown"}</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-green-600">
                ${usage.discount_amount} saved
              </p>
              <Badge
                variant={usage.status === "completed" ? "default" : "secondary"}
                className={
                  usage.status === "completed"
                    ? "bg-green-500/10 text-green-800 hover:bg-green-500/10"
                    : "bg-yellow-500/10 text-yellow-800 hover:bg-yellow-500/10"
                }
              >
                {usage.status || "pending"}
              </Badge>
            </div>
          </div>
        ))}{" "}
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={goPrevPage}
                // Simplified conditional logic
                aria-disabled={isFirstPage}
                className={cn(
                  "cursor-pointer border",
                  isFirstPage && "text-muted-foreground cursor-not-allowed",
                )}
              />
            </PaginationItem>

            {/* FIXED: Use totalPages from the hook */}
            {Array.from({ length: totalPages }, (_, index) => (
              <PaginationItem key={index + 1}>
                <PaginationLink
                  onClick={() => goToPage(index + 1)}
                  // A slightly better way to show the active state
                  isActive={currentPage === index + 1}
                  className="cursor-pointer"
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={goNextPage}
                aria-disabled={isLastPage}
                className={cn(
                  "cursor-pointer border",
                  isLastPage && "text-muted-foreground cursor-not-allowed",
                )}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}

export default UsageHistroy;
