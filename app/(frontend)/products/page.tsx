import { ChevronDown } from "lucide-react";

import { CategoryAccordion } from "@/components/CategoryAccordion";
import { CustomPagination } from "@/components/CustomPagination";
import { SearchBar } from "@/components/SearchBar";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { CATEGORY_DATA } from "@/lib/constants";
import { getAllProducts, getProducts } from "@/lib/services/product";

import { Product } from "@/types/product";

type SearchParamsProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function ProductsPage({
  searchParams,
}: SearchParamsProps) {
  const params = await searchParams;
  const currentPage = Math.max(1, Number(params.page) || 1);
  const q = typeof params.q === "string" ? params.q : "";

  const { products: allData } = await getAllProducts();

  const filteredProducts = allData.filter(
    (product) =>
      product.is_enabled === 1 &&
      product.title.toLowerCase().includes(q.toLowerCase())
  );
  const totalProduct = filteredProducts.length;
  const totalPages = Math.ceil(totalProduct / 10) || 1;
  const startIndex = (currentPage - 1) * 10;
  const products = filteredProducts.slice(startIndex, startIndex + 10);

  return (
    <div className="container mx-auto px-1 py-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
        <aside className="md:col-span-3">
          <div className="md:hidden">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-12 w-full justify-between border border-gray-200 bg-white px-3 py-4 text-gray-300"
                >
                  <span className="text-base">產品分類</span>
                  <ChevronDown className="size-4 text-black" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="border-primary-200 w-[calc(100vw-1rem)] rounded-lg bg-white p-4 shadow-xl">
                {/* 所有產品 - 獨立按鈕 */}
                <div className="px-1">所有產品</div>
                <CategoryAccordion CategoryData={CATEGORY_DATA} />
              </PopoverContent>
            </Popover>
          </div>
          <div className="hidden md:block">
            <div className="text-primary-300 border-primary-200 mb-2 cursor-pointer border-t border-b py-4 text-xl font-bold">
              所有商品
            </div>
            <CategoryAccordion CategoryData={CATEGORY_DATA} />
          </div>
        </aside>

        <main className="flex flex-col md:col-span-9">
          <div className="mb-6 w-full">
            <SearchBar />
          </div>

          {products.length === 0 ? (
            <div className="py-12 text-center text-gray-500">
              找不到符合{q ? `「${q}」` : "條件"}的產品
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="mt-12 flex justify-center">
            <CustomPagination totalPages={totalPages} />
          </div>
        </main>
      </div>
    </div>
  );
}
