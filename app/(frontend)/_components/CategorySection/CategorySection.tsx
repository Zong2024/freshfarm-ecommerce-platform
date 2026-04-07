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
        "grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center",
        className
      )}
    >
      {/* 左側圖片區域：增加層次與動態感 */}
      <div className="group relative aspect-video w-full overflow-hidden rounded-[2rem] bg-gray-100 shadow-2xl lg:col-span-7">
        <Image
          key={activeCategory.id}
          src={activeCategory.imageUrl}
          alt={activeCategory.title}
          fill
          className="object-cover transition-all duration-700 ease-out group-hover:scale-110"
          sizes="(max-width: 1024px) 100vw, 60vw"
        />
        {/* 玻璃質感標籤 */}
        <div className="absolute bottom-6 left-6 z-10 flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-xs font-bold tracking-widest text-white uppercase backdrop-blur-md">
          <span className="bg-primary h-1.5 w-1.5 animate-pulse rounded-full" />
          Featured Category
        </div>
        {/* 漸層遮罩 */}
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-60" />
      </div>

      {/* 右側內容與按鈕 */}
      <div className="flex flex-col lg:col-span-5 lg:pl-4">
        <div className="mb-10 min-h-[160px] space-y-4">
          <div className="flex items-center gap-2">
            <span className="bg-primary h-[1px] w-6" />
            <span className="text-primary text-xs font-bold tracking-[0.3em] uppercase">
              Section {HOME_CATEGORY_SECTIONS.indexOf(activeCategory) + 1}
            </span>
          </div>
          <h2 className="font-heading text-foreground text-4xl font-black tracking-tighter md:text-5xl lg:text-6xl">
            {activeCategory.title}
          </h2>
          <p className="max-w-md text-lg leading-relaxed text-gray-400 transition-all duration-500">
            {activeCategory.description}
          </p>
        </div>

        {/* 分類按鈕區塊 */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2">
          {HOME_CATEGORY_SECTIONS.map((category) => {
            const isActive = activeCategory.id === category.id;

            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category)}
                aria-label={`切換至${category.title}分類`}
                aria-current={isActive ? "true" : "false"}
                className={cn(
                  "group relative flex cursor-pointer items-center justify-between rounded-2xl px-6 py-5 text-left transition-all duration-300",
                  isActive
                    ? "bg-primary shadow-primary/20 text-white shadow-lg"
                    : "border-border hover:border-primary hover:text-primary border bg-white text-gray-400"
                )}
              >
                <span className="text-sm font-bold tracking-wide uppercase">
                  {category.title}
                </span>
                <div
                  className={cn(
                    "h-1.5 w-1.5 rounded-full transition-all duration-300",
                    isActive
                      ? "scale-125 bg-white"
                      : "group-hover:bg-primary bg-gray-200"
                  )}
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
