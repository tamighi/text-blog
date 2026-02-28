import Button from "@/components/Button";
import React from "react";

interface PaginatorProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
}

const Paginator: React.FC<PaginatorProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
}) => {
  const createPageRange = () => {
    const pages: (number | string)[] = [];
    const totalNumbers = siblingCount * 2 + 5;
    if (totalPages <= totalNumbers) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      const left = Math.max(2, currentPage - siblingCount);
      const right = Math.min(totalPages - 1, currentPage + siblingCount);

      pages.push(1);
      if (left > 2) pages.push("…");
      for (let i = left; i <= right; i++) pages.push(i);
      if (right < totalPages - 1) pages.push("…");
      pages.push(totalPages);
    }
    return pages;
  };

  const pages = createPageRange();

  return (
    <div className="flex justify-center mt-4 gap-2">
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </Button>

      {pages.map((page, idx) =>
        page === "…" ? (
          <span key={`ellipsis-${idx}`} className="px-2 py-1 color-fg-primary">
            …
          </span>
        ) : (
          <Button
            key={page}
            onClick={() => onPageChange(Number(page))}
            active={currentPage === page}
          >
            {page}
          </Button>
        ),
      )}

      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </div>
  );
};

export default Paginator;
