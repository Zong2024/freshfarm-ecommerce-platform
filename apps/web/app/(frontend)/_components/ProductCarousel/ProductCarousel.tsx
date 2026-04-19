"use client";

import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import {
  ProductCard,
  ProductCarouselSkeleton,
} from "@/components/shared/ProductCard";

import type { BasicProduct } from '@freshfarm/types';

interface ProductCarouselProps {
  products: BasicProduct[];
}

export function ProductCarousel({ products }: ProductCarouselProps) {
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

  if (!products || products.length === 0) {
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
