import React from "react";
import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiMoreFill,
} from "react-icons/ri";
import { Button, IconButton } from "..";
import { cn } from "../../../utils/cn";

const usePagination = ({ totalCount, pageSize, siblingCount = 1, currentPage }) => {
  const paginationRange = React.useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);
    const totalPageNumbers = siblingCount + 5;

    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);
      return [...leftRange, "...", totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      return [firstPageIndex, "...", ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, "...", ...middleRange, "...", lastPageIndex];
    }
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
};

const range = (start, end) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
  className,
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <div className={cn("flex items-center flex-col md:flex-row justify-between", className)}>
      <p className="text-sm text-muted-foreground">
        Página {currentPage} de {lastPage}
      </p>
      <div className="flex items-center gap-2 overflow-x-auto max-w-full scrollbar-none px-1">
        <IconButton
          onClick={onPrevious}
          disabled={currentPage === 1}
          variant="outline"
          rounded="md"
        >
          <RiArrowLeftSLine />
        </IconButton>
        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === "...") {
            return (
              <IconButton key={index} variant="outline" rounded="md" disabled>
                <RiMoreFill />
              </IconButton>
            );
          }
          return (
            <Button
              key={index}
              onClick={() => onPageChange(pageNumber)}
              variant={pageNumber === currentPage ? "primary" : "outline"}
              className="w-10 h-10"
            >
              {pageNumber}
            </Button>
          );
        })}
        <IconButton
          onClick={onNext}
          disabled={currentPage === lastPage}
          variant="outline"
          rounded="md"
        >
          <RiArrowRightSLine />
        </IconButton>
      </div>
    </div>
  );
};
