import { Skeleton } from "@/components/ui/skeleton";

export function ProductCardSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-50 bg-white shadow-sm">
      {/* Image Skeleton */}
      <div className="relative aspect-square w-full bg-gray-100">
        <Skeleton className="h-full w-full rounded-none" />
      </div>

      <div className="flex flex-1 flex-col p-4">
        {/* Category Skeleton */}
        <Skeleton className="mb-2 h-3 w-16" />
        {/* Title Skeleton */}
        <Skeleton className="mb-3 h-7 w-3/4" />

        {/* Description Skeleton (Match h-12 in actual card) */}
        <div className="h-12 space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>

        <div className="mt-auto flex items-center justify-between pt-4">
          {/* Price Skeleton */}
          <Skeleton className="h-7 w-24" />
          {/* Button Skeleton (Circle) */}
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      </div>
    </div>
  );
}
