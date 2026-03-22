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

import { getAllProducts, getProducts } from "@/lib/services/product";

import { Product } from "@/types/product";

type SearchParamsProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function ProductsPage({
  searchParams,
}: SearchParamsProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const q = typeof params.q === "string" ? params.q : "";

  let products: Product[] = [];
  let totalPages = 1;

  if (q) {
    const data = await getAllProducts();
    const allEnabledProducts = data.products.filter(
      (p) =>
        p.is_enabled === 1 && p.title.toLowerCase().includes(q.toLowerCase())
    );

    const ITEMS_PER_PAGE = 10;
    totalPages = Math.ceil(allEnabledProducts.length / ITEMS_PER_PAGE) || 1;
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    products = allEnabledProducts.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    );
  } else {
    const data = await getProducts(currentPage);
    products = data.products.filter((p) => p.is_enabled === 1);
    totalPages = data.pagination?.total_pages || 1;
  }

  const CATEGORY_DATA = [
    {
      id: "origin",
      title: "產地",
      items: ["北部", "中部", "南部", "東部", "離島"],
    },
    {
      id: "season",
      title: "季節",
      items: ["春季", "夏季", "秋季", "冬季"],
    },
    {
      id: "organic",
      title: "有機認證",
      items: ["有機標章", "無農藥殘留"],
    },
  ];

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
              <PopoverContent
                className="border-primary-200 w-(--radix-popover-trigger-width) rounded-xl bg-white p-4 shadow-xl"
                align="start"
              >
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
