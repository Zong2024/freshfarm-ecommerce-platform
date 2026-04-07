"use client";

import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import {
  ProductCard,
  ProductCardSkeleton,
} from "@/components/shared/ProductCard";

import { useGetProductsQuery } from "@/lib/store/services/productApi";

export function ProductCarousel() {
  const { data, isLoading, error } = useGetProductsQuery(1);

  if (isLoading) {
    return (
      <div className="grid w-full grid-cols-2 gap-4 px-4 pb-8 md:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
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
