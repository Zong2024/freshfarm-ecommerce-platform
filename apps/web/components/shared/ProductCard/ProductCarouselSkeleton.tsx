import { ProductCardSkeleton } from "./ProductCardSkeleton";

export function ProductCarouselSkeleton() {
  return (
    <div className="w-full px-4 pb-12">
      <div className="flex gap-6 overflow-hidden">
        {/* 在桌面端顯示 4 個，行動端隱藏多餘的 */}
        <div className="min-w-[280px] flex-1">
          <ProductCardSkeleton />
        </div>
        <div className="hidden min-w-[280px] flex-1 md:block">
          <ProductCardSkeleton />
        </div>
        <div className="hidden min-w-[280px] flex-1 lg:block">
          <ProductCardSkeleton />
        </div>
        <div className="hidden min-w-[280px] flex-1 text-zinc-100 lg:block">
          <ProductCardSkeleton />
        </div>
        {/* 露出一點點邊緣，模擬 Swiper 的 4.2 效果 */}
        <div className="hidden w-20 min-w-[280px] flex-none opacity-50 lg:block">
          <ProductCardSkeleton />
        </div>
      </div>
    </div>
  );
}
