"use client";

import { useState } from "react";

import Image from "next/image";

import { HOME_CATEGORY_SECTIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";

import { CategorySectionProps } from "./CategorySection.types";

export const CategorySection = ({ className }: CategorySectionProps) => {
  const [activeCategory, setActiveCategory] = useState(
    HOME_CATEGORY_SECTIONS[0]
  );

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center",
        className
      )}
    >
      <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-gray-200 transition-all duration-300 lg:col-span-6">
        <Image
          src={activeCategory.imageUrl}
          alt={activeCategory.title}
          fill
          className="object-cover transition-opacity duration-300"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

      <div className="flex flex-col space-y-6 lg:col-span-6 lg:pl-8">
        <div className="min-h-35">
          <h2 className="text-primary-400 text-3xl font-bold transition-all duration-300 md:text-4xl">
            {activeCategory.title}
          </h2>
          <p className="my-4 leading-relaxed text-gray-600 transition-all duration-300 md:text-lg">
            {activeCategory.description}
          </p>
        </div>

        {/* 分類按鈕區塊 */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2">
          {HOME_CATEGORY_SECTIONS.map((category) => {
            const isActive = activeCategory.id === category.id;

            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category)}
                aria-label={`切換至${category.title}分類`}
                aria-current={isActive ? "true" : "false"}
                className={cn(
                  "flex cursor-pointer items-center justify-center rounded-lg p-4 text-center text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary-400 scale-[1.02] text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                )}
              >
                {category.title}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
