"use client";
import React from "react";

import FormattedAfghani from "@/components/FormattedAfghani";
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
import { ReferredUserEntry } from "@/types/profile.types";
interface ReferredUsers {
  referredUsers: ReferredUserEntry[];
}
const itemPerPage = 5;
const ReferredUsers = ({ referredUsers }: ReferredUsers) => {
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
    totalItems: referredUsers.length,
  });
  const start = currentPage * itemPerPage - itemPerPage;
  const end = currentPage * itemPerPage;
  return (
    <div className="space-y-4">
      {referredUsers.length == 0 && (
        <div className="flex h-96 w-full items-center justify-center">
          <p className="text-muted-foreground">
            No users joined with your referral code
          </p>
        </div>
      )}
      {referredUsers.length > 0 &&
        referredUsers.slice(start, end).map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between border-b py-3 last:border-b-0"
          >
            <div className="flex-1">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-muted-foreground text-xs">{user.email}</p>
              <p className="text-muted-foreground text-xs">{user.phone}</p>
              {user.joined_at && (
                <p className="text-secondary-foreground text-xs">
                  Joined {formateDateMDYT(user.joined_at)}
                </p>
              )}
            </div>
            <div className="text-right">
              <Badge
                variant={user.status === "active" ? "default" : "secondary"}
                className={
                  user.status === "active"
                    ? "bg-green-500/10 text-green-800 hover:bg-green-500/10"
                    : "text-secondary-foreground bg-gray-500/10 hover:bg-gray-500/10"
                }
              >
                {user.status}
              </Badge>
              {user.total_spent && (
                <p className="mt-1 text-xs text-blue-600">
                  Total spent: <FormattedAfghani amount={user.total_spent} />
                </p>
              )}
            </div>
          </div>
        ))}
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={goPrevPage}
                aria-disabled={isFirstPage}
                className={cn(
                  "cursor-pointer border",
                  isFirstPage && "text-muted-foreground cursor-not-allowed",
                )}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, index) => (
              <PaginationItem key={index + 1}>
                <PaginationLink
                  onClick={() => goToPage(index + 1)}
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
};

export default ReferredUsers;
