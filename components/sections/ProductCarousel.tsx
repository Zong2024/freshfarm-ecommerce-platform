"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import { useGetProductsQuery } from "@/lib/store/services/productApi";
import { ProductCard } from "@/components/ui/ProductCard";

export function ProductCarousel() {
  const { data, isLoading, error } = useGetProductsQuery(1);

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <div className="border-primary-400 h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
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
