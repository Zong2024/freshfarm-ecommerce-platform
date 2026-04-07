"use client";

// @ts-expect-error　正確載入
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { ProductCard } from "@/components/shared/ProductCard";

import { useGetProductsQuery } from "@/lib/store/services/productApi";

export function ProductCarousel() {
  const { data, isLoading, error } = useGetProductsQuery(1);

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <div className="border-primary-400 h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
      </div>
    );
  }

  const products = data?.products?.filter((p) => p.is_enabled === 1) || [];

  if (error || products.length === 0) {
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
