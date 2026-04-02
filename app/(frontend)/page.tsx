import { SectionHeader } from "@/app/(frontend)/_components/SectionHeader";

import { Hero } from "@/components/sections/Hero";
import { ProductCarousel } from "@/components/sections/ProductCarousel";

import { CategorySection } from "./_components/CategorySection";

export default function Home() {
  return (
    <>
      <Hero title="從產地到餐桌的直線距離" subtitle="把產地的鮮活，直送你家" />
      <section className="container mx-auto px-3 py-20 md:py-30">
        <SectionHeader
          badge="時令直送"
          title="當季限定 強力推薦"
          subtitle="支持在地，享受最新鮮的台灣味"
        />

        <ProductCarousel />
      </section>
      <div className="bg-primary-100 md:rounded-tl-[200px] md:rounded-bl-[200px]">
        <section className="container mx-auto px-3 py-20 md:py-30">
          <SectionHeader
            badge="商品分類"
            title="您的餐桌 是小農最好的舞台"
            subtitle="最簡單的選擇，最純粹的美味"
          />

          {/* 商品分類區 */}
          <CategorySection />
        </section>
      </div>
    </>
  );
}
