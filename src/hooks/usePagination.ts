"use client";

import { useMemo, useState } from "react";

interface usePaginationProps {
  totalItems: number;
  itemPerPage: number;
}

const usePagination = ({ itemPerPage, totalItems }: usePaginationProps) => {
  const totalPages = useMemo(() => {
    if (totalItems === 0) return 1;
    return Math.ceil(totalItems / itemPerPage);
  }, [totalItems, itemPerPage]);

  const [currentPage, setCurrentPage] = useState(1);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const goNextPage = () => {
    if (isLastPage) return;
    setCurrentPage((prev) => prev + 1);
  };

  const goPrevPage = () => {
    if (isFirstPage) return;
    setCurrentPage((prev) => prev - 1);
  };

  const goToPage = (page: number) => {
    if (page === currentPage || page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return {
    currentPage,
    isFirstPage,
    isLastPage,
    totalPages,
    goNextPage,
    goPrevPage,
    goToPage,
  };
};

export default usePagination;
