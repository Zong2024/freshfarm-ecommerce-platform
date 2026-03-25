import Image from "next/image";
import Link from "next/link";

import { Product } from "@/types/product";

import { AddToCartIconButton } from "../button/AddToCartIconButton";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { imageUrl, title, category, id, description, price, origin_price } =
    product;
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-50 bg-white shadow-sm transition-all hover:shadow-md">
      <Link
        href={`/products/${id}`}
        className="relative block aspect-square w-full overflow-hidden bg-gray-100"
      >
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {price < origin_price && (
          <div className="bg-danger absolute top-2 left-2 rounded-full px-2 py-1 text-xs font-bold text-white">
            特價
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-1 text-xs font-medium text-gray-400">{category}</div>
        <Link
          href={`/products/${id}`}
          className="hover:text-primary-200 mb-2 line-clamp-2 text-xl font-semibold"
        >
          {title}
        </Link>
        <div className="line-clamp-2 h-12 leading-6 text-gray-300">
          {description}
        </div>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex">
            <span className="text-secondary-300 text-xl font-bold">
              NT$ {price}
            </span>
            {price < origin_price && (
              <span className="ms-2 text-sm text-gray-400 line-through">
                NT$ {origin_price}
              </span>
            )}
          </div>
          <AddToCartIconButton product={product} />
        </div>
      </div>
    </div>
  );
}
