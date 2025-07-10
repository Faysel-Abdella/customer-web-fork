"use client";
import React, { useCallback, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useRouter } from "@/i18n/navigation";
import { PageData } from "@/types/shared.types";

interface RestaurantPaginationProps {
  pageData: PageData;
}

const RestaurantPagination = ({ pageData }: RestaurantPaginationProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);

    if (page <= 0 || page > pageData.pageCount) return;
    if (params.get("page") == null) return;

    if (params.get("page") == (pageData.currentPage - 1).toString()) return;
    params.set("page", page.toString());
    router.push({
      pathname,
      query: Object.fromEntries(params),
    });
  };
  const setFreshParams = useCallback(() => {
    const params = new URLSearchParams(searchParams);
    if (params.get("page") == null) {
      params.set("page", "0");
      router.push({
        pathname,
        query: Object.fromEntries(params),
      });
    }
  }, [pathname, router, searchParams]);
  useEffect(() => {
    setFreshParams();
  }, [setFreshParams]);
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className="cursor-pointer"
            onClick={() => handlePageChange(pageData.currentPage)}
          />
        </PaginationItem>
        {Array.from({ length: pageData.pageCount }, (_, i) => i + 1)
          .slice(0, 3)
          .map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                className="cursor-pointer"
                onClick={() => handlePageChange(page)}
                isActive={page == pageData.currentPage}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            className="cursor-pointer"
            onClick={() => handlePageChange(pageData.currentPage + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default RestaurantPagination;
