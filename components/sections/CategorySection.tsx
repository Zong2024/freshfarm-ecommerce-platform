"use client";

import Image from "next/image";
import { useState } from "react";

const categories = [
  {
    id: "vegetables",
    title: "當季蔬果",
    description:
      "從春日的翠綠葉菜到夏日的甜美瓜果，從秋季的豐收根莖到冬日的溫暖果實，我們與全台堅持友善耕作的小農合作，確保每一口都是當令的鮮甜與營養。",
    imageUrl: "/image/vegetables.jpg",
  },
  {
    id: "seafood",
    title: "現撈海鮮",
    description:
      "我們與在地漁民緊密合作，確保每一隻蝦都是當日現撈，並以最嚴謹的保鮮技術，鎖住最原始的海洋風味。每項商品都附有詳細的捕撈日期、產地資訊與檢驗報告，讓您吃得安心又放心。",
    imageUrl: "/image/seafood.jpg",
  },
  {
    id: "meat",
    title: "優質肉蛋",
    description:
      "從口感鮮美的自然豬肉、肉質紮實的放山雞，到營養豐富的機能蛋，我們確保每一份肉品與蛋品都符合嚴格的品質標準。您可以透過平台追溯飼養環境、飼料來源以及相關認證。",
    imageUrl: "/image/meat.jpg",
  },
  {
    id: "processed",
    title: "在地加工品",
    description:
      "從手工熬煮的天然果醬、陽光曬製的健康果乾，到遵循古法製作的在地米麵、特色醬料，每一項產品都來自在地小農的用心。您可以深入了解製作過程、原料來源與品牌故事，感受產品背後的溫度與堅持。",
    imageUrl: "/image/processed.jpg",
  },
];

export function CategorySection() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gray-200 transition-all duration-300 lg:col-span-6">
        <Image
          src={activeCategory.imageUrl}
          alt={activeCategory.title}
          fill
          className="object-cover transition-opacity duration-300"
        />
      </div>

      <div className="flex flex-col space-y-6 lg:col-span-6 lg:pl-8">
        <div className="min-h-[140px]">
          <h2 className="text-primary-400 text-3xl font-bold transition-all duration-300 md:text-4xl">
            {activeCategory.title}
          </h2>
          <p className="my-4 leading-relaxed text-gray-600 transition-all duration-300 md:text-lg">
            {activeCategory.description}
          </p>
        </div>

        {/* 分類按鈕區塊 */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2">
          {categories.map((category) => {
            const isActive = activeCategory.id === category.id;

            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category)}
                className={`flex cursor-pointer items-center justify-center rounded-lg p-4 text-center text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-primary-400 scale-[1.02] text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {category.title}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
