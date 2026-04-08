"use client";

import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import {
  ProductCard,
  ProductCarouselSkeleton,
} from "@/components/shared/ProductCard";

import { useGetProductsQuery } from "@/lib/store/services/productApi";

export function ProductCarousel() {
  const { data, isLoading, error } = useGetProductsQuery(1);

  const swiperConfig = {
    modules: [Autoplay],
    spaceBetween: 24,
    slidesPerView: 1.3,
    loop: true,
    grabCursor: true,
    speed: 600,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    breakpoints: {
      640: {
        slidesPerView: 2.3,
        spaceBetween: 24,
      },
      1024: {
        slidesPerView: 4.2,
        spaceBetween: 24,
      },
    },
    className: "w-full px-4 !pb-12",
  };

  if (isLoading) {
    return <ProductCarouselSkeleton />;
  }

  const products = data?.products?.filter((p) => p.is_enabled === 1) || [];

  if (error || products.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      <Swiper {...swiperConfig}>
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
