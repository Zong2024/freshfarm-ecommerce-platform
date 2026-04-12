import { Suspense } from "react";

import { SectionHeader } from "@/app/(frontend)/_components/SectionHeader";

import { ProductCarouselSkeleton } from "@/components/shared/ProductCard";

import { getProducts } from "@/lib/services/product";

import type { BasicProduct } from "@/types/product";

import { CategorySection } from "./_components/CategorySection";
import { Hero } from "./_components/Hero";
import { ProductCarousel } from "./_components/ProductCarousel";

export default async function Home() {
  const data = await getProducts(1);
  const carouselProducts: BasicProduct[] = (data?.products || [])
    .slice(0, 10)
    .map((p) => ({
      id: p.id,
      title: p.title,
      origin_price: p.origin_price,
      category: p.category,
      imageUrl: p.imageUrl,
      description: p.description,
      price: p.price,
    }));

  return (
    <main className="bg-background min-h-screen">
      <Hero title="從產地到餐桌的直線距離" subtitle="把產地的鮮活，直送你家" />

      {/* 當季限定區塊 */}
      <section className="container mx-auto px-6 py-24 lg:py-40">
        <SectionHeader
          badge="時令直送"
          title="當季限定 強力推薦"
          subtitle="支持在地，享受最新鮮的台灣味"
        />

        <div className="mt-12 lg:mt-20">
          <Suspense fallback={<ProductCarouselSkeleton />}>
            <ProductCarousel products={carouselProducts} />
          </Suspense>
        </div>
      </section>

      {/* 商品分類區塊  */}
      <div className="bg-primary-50 relative overflow-hidden lg:rounded-tl-[160px] lg:rounded-bl-[160px]">
        <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 opacity-10">
          <div className="border-primary h-96 w-96 rounded-full border-[40px]" />
        </div>

        <section className="container mx-auto px-6 py-24 lg:py-40">
          <SectionHeader
            badge="商品分類"
            title="您的餐桌 是小農最好的舞台"
            subtitle="最簡單的選擇，最純粹的美味"
          />

          <div className="mt-12 lg:mt-20">
            <CategorySection />
          </div>
        </section>
      </div>
    </main>
  );
}
