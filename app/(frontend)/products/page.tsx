import Link from "next/link";

import { ChevronDown } from "lucide-react";

import { CategoryAccordion } from "@/components/CategoryAccordion";
import { CustomPagination } from "@/components/CustomPagination";
import { SearchBar } from "@/components/common/SearchBar";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { CATEGORY_DATA } from "@/lib/constants";
import { getAllProducts } from "@/lib/services/product";
import { getRegion } from "@/lib/utils";

type SearchParamsProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function ProductsPage({
  searchParams,
}: SearchParamsProps) {
  const params = await searchParams;
  const getStringParam = (param: string | string[] | undefined) =>
    typeof param === "string" ? param : "";
  const q = getStringParam(params.q);
  const origin = getStringParam(params.origin);
  const type = getStringParam(params.type);

  const currentPage = Math.max(1, Number(params.page) || 1);

  const { products: allData } = await getAllProducts();

  const filteredProducts = allData.filter((product) => {
    // 啟用狀態與關鍵字搜尋
    const isEnabled = product.is_enabled === 1;
    const matchesQuery = product.title.toLowerCase().includes(q.toLowerCase());

    if (!isEnabled || !matchesQuery) return false;

    // 產地過濾
    if (origin) {
      const productRegion = getRegion(product.origin || "");
      if (productRegion !== origin) return false;
    }

    // 品項過濾
    if (type) {
      switch (type) {
        case "蔬菜":
          if (product.category !== "蔬菜") return false;
          break;
        case "水果":
          if (product.category !== "水果") return false;
          break;
        case "水產":
          if (product.category !== "水產") return false;
          break;
        case "其他":
          if (["蔬菜", "水果", "水產"].includes(product.category)) return false;
          break;
        default:
          break;
      }
    }

    return true;
  });

  const totalProduct = filteredProducts.length;
  const totalPages = Math.ceil(totalProduct / 10) || 1;
  const startIndex = (currentPage - 1) * 10;
  const products = filteredProducts.slice(startIndex, startIndex + 10);

  // 用於清除過濾器的 URL
  const allProductsUrl = q ? `/products?q=${q}` : "/products";

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
                <Link
                  href={allProductsUrl}
                  className="block px-1 py-2 hover:font-bold"
                >
                  所有產品
                </Link>
                <CategoryAccordion CategoryData={CATEGORY_DATA} />
              </PopoverContent>
            </Popover>
          </div>
          <div className="hidden md:block">
            <Link
              href={allProductsUrl}
              className="text-primary-300 border-primary-200 hover:text-primary-400 mb-2 block border-t border-b py-4 text-xl font-bold"
            >
              所有商品
            </Link>
            <CategoryAccordion CategoryData={CATEGORY_DATA} />
          </div>
        </aside>

        <main className="flex flex-col md:col-span-9">
          <div className="mb-6 w-full">
            <SearchBar />
          </div>

          {(origin || type) && (
            <div className="mb-4 flex flex-wrap gap-2">
              {[origin, type].filter(Boolean).map((filter) => (
                <span
                  key={filter}
                  className="bg-primary-100 text-primary-400 rounded-full px-3 py-1 text-sm font-medium"
                >
                  {filter}
                </span>
              ))}
            </div>
          )}

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
