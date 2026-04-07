"use client";

import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import {
  ProductCard,
  ProductCardSkeleton,
} from "@/components/card/ProductCard";

import { useGetProductsQuery } from "@/lib/store/services/productApi";

export function ProductCarousel() {
  const { data, isLoading, error } = useGetProductsQuery(1);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error || !data?.products) {
    return (
      <div className="text-destructive p-8 text-center">
        無法載入商品資料，請稍後再試。
      </div>
    );
  }

  const products = data.products.filter((p) => p.is_enabled === 1);

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="w-full pb-8">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={16}
        slidesPerView={1.2}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          // mobile
          640: {
            slidesPerView: 2,
            spaceBetween: 24,
          },
          // desktop
          1024: {
            slidesPerView: 4,
            spaceBetween: 24,
          },
        }}
        className="w-full px-4"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
