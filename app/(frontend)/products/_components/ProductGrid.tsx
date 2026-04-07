import { ProductCard } from "@/components/card/ProductCard";

import { Product } from "@/types/product";

interface ProductGridProps {
  products: Product[];
  searchQuery: string;
}

export const ProductGrid = ({ products, searchQuery }: ProductGridProps) => {
  if (products.length === 0) {
    return (
      <div className="py-12 text-center text-gray-500">
        找不到符合{searchQuery ? `「${searchQuery}」` : "條件"}的產品
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
