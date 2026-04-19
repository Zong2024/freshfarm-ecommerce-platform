"use client";

import { useState } from "react";

import Image from "next/image";

import { Heart } from "lucide-react";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import { ProductGalleryProps } from "./ProductGallery.types";

export const ProductGallery = ({
  mainImage,
  subImages = [],
  productTitle,
}: ProductGalleryProps) => {
  const [selectIndex, setSelectIndex] = useState(0);

  // 將主圖與副圖組合成一個陣列
  const allImages = [mainImage, ...subImages];

  return (
    <>
      {/* 主圖 */}
      <div className="relative aspect-4/3 overflow-hidden rounded-sm bg-gray-100">
        <Image
          src={allImages[selectIndex] || mainImage}
          alt={productTitle}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="h-full w-full object-cover"
        />
        {/* 收藏按鈕 */}

        <button className="hover:text-secondary-200 absolute right-4 bottom-4 z-10 rounded-full bg-white/90 p-2.5 text-gray-500 shadow-sm transition-colors hover:bg-white">
          <Heart className="h-5 w-5" />
        </button>
      </div>

      {/* 縮圖列 */}
      {allImages.length > 1 && (
        <div className="grid grid-cols-4 gap-2 md:gap-4">
          {allImages.map((imageUrl, i) => {
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
                <Image
                  src={imageUrl}
                  alt={`${productTitle} 縮圖 ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 25vw, 15vw"
                  className="h-full w-full object-cover"
                />
                {!isSelected && (
                  <div className="absolute inset-0 z-10 bg-white/50 transition-colors group-hover:bg-white/20"></div>
                )}
              </Button>
            );
          })}
        </div>
      )}
    </>
  );
};
