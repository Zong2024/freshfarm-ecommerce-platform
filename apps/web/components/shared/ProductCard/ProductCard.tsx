import Image from "next/image";
import Link from "next/link";

import { AddToCartIconButton } from "../AddToCartIconButton";
import { ProductCardProps } from "./ProductCard.types";

export function ProductCard({ product }: ProductCardProps) {
  const { imageUrl, title, category, id, description, price, origin_price } =
    product;
  const isSale = price < origin_price;

  return (
    <div className="group border-border bg-card relative flex h-full flex-col overflow-hidden rounded-2xl border shadow-sm transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1.5 hover:shadow-xl hover:shadow-black/5">
      <Link
        href={`/products/${id}`}
        className="relative block aspect-square w-full overflow-hidden bg-gray-50"
      >
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-110"
        />

        {/* 漸層遮罩 - 提升質感與標籤可讀性 */}
        <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {isSale && (
          <div className="bg-danger/90 absolute top-3 left-3 z-10 rounded-full px-3 py-1 text-[10px] font-bold tracking-wider text-white uppercase shadow-lg backdrop-blur-xs">
            SALE
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-1 text-[10px] font-bold tracking-widest text-gray-300 uppercase">
          {category}
        </div>
        <Link
          href={`/products/${id}`}
          className="text-foreground group-hover:text-primary mb-2 line-clamp-1 text-lg font-bold tracking-tight transition-colors duration-300"
        >
          {title}
        </Link>
        <div className="mb-6 line-clamp-2 text-sm leading-relaxed text-gray-400">
          {description}
        </div>

        <div className="mt-auto flex items-end justify-between">
          <div className="flex flex-col">
            <div className="h-5">
              {isSale && (
                <span className="text-xs text-gray-300 line-through decoration-gray-200">
                  NT$ {origin_price}
                </span>
              )}
            </div>
            <span className="text-secondary-300 text-xl font-black tracking-tight">
              <span className="mr-1 text-sm font-medium">NT$</span>
              {price}
            </span>
          </div>

          <div className="translate-y-2 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
            <AddToCartIconButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
