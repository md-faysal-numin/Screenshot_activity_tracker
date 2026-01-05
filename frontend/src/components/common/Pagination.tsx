// src/components/common/Pagination.tsx
import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  maxVisible?: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = true,
  maxVisible = 5,
}) => {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      let startPage = Math.max(2, currentPage - Math.floor(maxVisible / 2));
      let endPage = Math.min(totalPages - 1, startPage + maxVisible - 3);

      if (endPage === totalPages - 1) {
        startPage = Math.max(2, endPage - maxVisible + 3);
      }

      if (startPage > 2) {
        pages.push("...");
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages - 1) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  // console.log(currentPage, totalPages);

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      {showFirstLast && (
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
          aria-label="First page"
        >
          <ChevronsLeft size={18} />
        </button>
      )}

      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
        aria-label="Previous page"
      >
        <ChevronLeft size={18} />
      </button>

      <div className="flex gap-1">
        {visiblePages.map((page, index) => {
          if (page === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-3 py-2 text-gray-500"
              >
                ...
              </span>
            );
          }

          return (
            <button
              key={page}
              onClick={() => onPageChange(page as number)}
              className={`min-w-10 px-3 py-2 rounded-lg font-medium transition ${
                currentPage === page
                  ? "bg-blue-600 text-white shadow-md"
                  : "border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {page}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
        aria-label="Next page"
      >
        <ChevronRight size={18} />
      </button>

      {showFirstLast && (
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
          aria-label="Last page"
        >
          <ChevronsRight size={18} />
        </button>
      )}
    </div>
  );
};
