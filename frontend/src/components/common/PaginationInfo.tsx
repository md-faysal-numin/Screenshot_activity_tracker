import React from "react";

interface PaginationInfoProps {
  currentPage: number;
  perPage: number;
  total: number;
}

export const PaginationInfo: React.FC<PaginationInfoProps> = ({
  currentPage,
  perPage,
  total,
}) => {
  const startItem = (currentPage - 1) * perPage + 1;
  const endItem = Math.min(currentPage * perPage, total);

  if (total === 0) {
    return (
      <div className="text-sm text-gray-600 text-center mt-2">
        No results found
      </div>
    );
  }

  return (
    <div className="text-sm text-gray-600 text-center mt-2">
      Showing <span className="font-semibold">{startItem}</span> to{" "}
      <span className="font-semibold">{endItem}</span> of{" "}
      <span className="font-semibold">{total}</span> results
    </div>
  );
};
