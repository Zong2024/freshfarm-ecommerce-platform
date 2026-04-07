import { Skeleton } from "@/components/ui/skeleton";

import { cn } from "@/lib/utils";

import { ProductCardSkeletonProps } from "./ProductCard.types";

export function ProductCardSkeleton({ className }: ProductCardSkeletonProps) {
  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl border border-gray-50 bg-white shadow-sm transition-all",
        className
      )}
    >
      {/* Image Skeleton */}
      <div className="relative aspect-square w-full bg-gray-100">
        <Skeleton className="h-full w-full rounded-none" />
      </div>

      <div className="flex flex-1 flex-col p-4">
        {/* Category Skeleton */}
        <Skeleton className="mb-2 h-3 w-16" />

        {/* Title Skeleton */}
        <Skeleton className="mb-3 h-7 w-3/4" />

        {/* Description Skeleton */}
        <div className="mb-4 space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {/* Price Skeleton */}
            <Skeleton className="h-7 w-20" />
            {/* Original Price Skeleton (sometimes exists) */}
            <Skeleton className="h-4 w-12" />
          </div>

          {/* Add to Cart Button Skeleton */}
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      </div>
    </div>
  );
}
