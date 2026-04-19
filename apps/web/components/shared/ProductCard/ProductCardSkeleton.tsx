import { Skeleton } from "@/components/ui/skeleton";

export function ProductCardSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm">
      {/* Image Skeleton */}
      <div className="relative aspect-square w-full bg-zinc-100">
        <Skeleton className="h-full w-full rounded-none" />
      </div>

      <div className="flex flex-1 flex-col p-5">
        {/* Category Skeleton */}
        <Skeleton className="mb-2 h-3 w-12" />
        {/* Title Skeleton */}
        <Skeleton className="mb-4 h-7 w-3/4" />

        {/* Description Skeleton */}
        <div className="mb-6 space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>

        <div className="mt-auto flex items-end justify-between">
          <div className="space-y-1">
            {/* Price Skeleton */}
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-8 w-24" />
          </div>
          {/* Button Skeleton (Circle) */}
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      </div>
    </div>
  );
}
