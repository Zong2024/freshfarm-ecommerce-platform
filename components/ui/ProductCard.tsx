import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
      <Link
        href={`/products/${product.id}`}
        className="relative block aspect-square h-[250px] w-full overflow-hidden bg-gray-100 md:h-[280px]"
      >
        <Image
          src={product.imageUrl}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {product.price < product.origin_price && (
          <div className="absolute top-2 left-2 rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white">
            特價
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-1 text-xs font-medium text-gray-500">
          {product.category}
        </div>
        <Link
          href={`/products/${product.id}`}
          className="hover:text-primary-200 mb-2 line-clamp-2 text-xl font-semibold"
        >
          {product.title}
        </Link>
        <div className="line-clamp-2 h-[3rem] leading-6 text-gray-300">
          {product.description}
        </div>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex">
            <span className="text-secondary-300 text-lg font-bold">
              NT$ {product.price}
            </span>
            {product.price < product.origin_price && (
              <span className="ms-2 text-sm text-gray-400 line-through">
                NT$ {product.origin_price}
              </span>
            )}
          </div>
          <Button
            size="icon"
            className="bg-primary-100 hover:bg-primary-300 rounded-full"
            title="加入購物車"
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
