import { useState } from 'react';

export const usePagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handlePage = (value: number) => {
    setCurrentPage(value);
  };

  const handlePrevPage = () => {
    if (currentPage === 1) return;
    setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage === totalPages) return;
    setCurrentPage((prev) => prev + 1);
  };

  return {
    currentPage,
    totalPages,
    setCurrentPage,
    setTotalPages,
    handlePage,
    handlePrevPage,
    handleNextPage,
  };
};
