// components/shared/Pagination.tsx
"use client";
import { GoArrowRight } from "react-icons/go";

type PaginationProps = {
  currentPage: number;
  lastPage: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ currentPage, lastPage, onPageChange }: PaginationProps) => {
  if (lastPage <= 1) return null;

  return (
    <div className="flex justify-center items-center mt-4 gap-2 flex-wrap">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 text-sm bg-gray-700 text-white rounded disabled:opacity-50 rotate-180"
      >
        <GoArrowRight />
      </button>

      {Array.from({ length: lastPage }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => onPageChange(i + 1)}
          className={`px-3 py-1 text-sm rounded ${
            currentPage === i + 1
              ? "bg-blue-600 text-white"
              : "bg-gray-800 text-gray-300"
          }`}
        >
          {i + 1}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === lastPage}
        className="px-3 py-1 text-sm bg-gray-700 text-white rounded disabled:opacity-50"
      >
        <GoArrowRight />
      </button>
    </div>
  );
};

export default Pagination;
