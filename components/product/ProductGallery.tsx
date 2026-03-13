"use client";

import { useState } from "react";

import { Heart } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "../ui/button";

export const ProductGallery = () => {
  const [selectIndex, setSelectIndex] = useState(1);

  return (
    <>
      {/* 主圖 */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-gray-100">
        <img
          src="https://picsum.photos/seed/pomelo/800/600"
          alt="商品圖片"
          className="h-full w-full object-cover"
        />
        {/* 收藏按鈕 */}

        <button className="hover:text-secondary-200 absolute right-4 bottom-4 rounded-full bg-white/90 p-2.5 text-gray-500 shadow-sm transition-colors hover:bg-white">
          <Heart className="h-5 w-5" />
        </button>
      </div>

      {/* 縮圖列 */}
      <div className="grid grid-cols-4 gap-2 md:gap-4">
        {[1, 2, 3, 4].map((i) => {
          const isSelected = i === selectIndex;
          return (
            <Button
              key={i}
              type="button"
              onClick={() => setSelectIndex(i)}
              variant="ghost"
              className={cn(
                "group relative aspect-square h-auto w-full cursor-pointer overflow-hidden rounded-sm border-2 p-0 transition-all",
                isSelected ? "border-primary-200" : "border-transparent"
              )}
            >
              <img
                src={`https://picsum.photos/seed/pomelo${i}/200/200`}
                alt={`縮圖 ${i}`}
                className="h-full w-full object-cover"
              />
              {!isSelected && (
                <div className="absolute inset-0 bg-white/50 transition-colors group-hover:bg-white/20"></div>
              )}
            </Button>
          );
        })}
      </div>
    </>
  );
};
