import { Hero } from "@/components/sections/Hero";
import { ProductCarousel } from "@/components/sections/ProductCarousel";
import { CategorySection } from "@/components/sections/CategorySection";

export default function Home() {
  return (
    <>
      <Hero
        title={"從產地到餐桌的直線距離"}
        subtitle={"把產地的鮮活，直送你家"}
      />
      <section className="container mx-auto py-20 md:py-30">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 md:text-4xl">
            當季限定 強力推薦
          </h2>
          <p className="mt-2 text-gray-400">支持在地，享受最新鮮的台灣味</p>
        </div>
        <ProductCarousel />
      </section>
      <div className="bg-primary-100 md:rounded-tl-[200px] md:rounded-bl-[200px]">
        <section className="container mx-auto px-4 py-20 md:py-30">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800 md:text-4xl">
              商品分類
            </h2>
            <p className="mt-2 text-gray-400">最簡單的選擇，最純粹的美味</p>
          </div>
          {/* 商品分類區 */}
          <CategorySection />
        </section>
      </div>
    </>
  );
}
