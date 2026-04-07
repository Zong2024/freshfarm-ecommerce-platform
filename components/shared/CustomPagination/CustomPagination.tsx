"use client";

import { Suspense } from "react";

import { usePathname, useSearchParams } from "next/navigation";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { CustomPaginationProps } from "./CustomPagination.types";

function PaginationContentBase({
  totalPages,
  className,
}: CustomPaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  // Generate page numbers to display
  const generatePagination = (current: number, total: number) => {
    if (total <= 5) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    if (current <= 3) {
      return [1, 2, 3, 4, "...", total];
    }

    if (current >= total - 2) {
      return [1, "...", total - 3, total - 2, total - 1, total];
    }

    return [1, "...", current - 1, current, current + 1, "...", total];
  };

  const allPages = generatePagination(currentPage, totalPages);

  if (totalPages <= 1) return null;

  return (
    <Pagination className={className}>
      <PaginationContent>
        {currentPage > 1 ? (
          <PaginationItem>
            <PaginationPrevious href={createPageURL(currentPage - 1)} />
          </PaginationItem>
        ) : (
          <PaginationItem>
            <PaginationPrevious
              href="#"
              className="pointer-events-none opacity-50"
              aria-disabled="true"
            />
          </PaginationItem>
        )}

        {allPages.map((page, index) => {
          if (page === "...") {
            return (
              <PaginationItem key={`${page}-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={page}>
              <PaginationLink
                href={createPageURL(page)}
                isActive={currentPage === page}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {currentPage < totalPages ? (
          <PaginationItem>
            <PaginationNext href={createPageURL(currentPage + 1)} />
          </PaginationItem>
        ) : (
          <PaginationItem>
            <PaginationNext
              href="#"
              className="pointer-events-none opacity-50"
              aria-disabled="true"
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}

export function CustomPagination({
  totalPages,
  className,
}: CustomPaginationProps) {
  return (
    <Suspense
      fallback={
        <div className="text-muted-foreground flex h-10 w-full items-center justify-center text-sm">
          Loading pagination...
        </div>
      }
    >
      <PaginationContentBase totalPages={totalPages} className={className} />
    </Suspense>
  );
}
