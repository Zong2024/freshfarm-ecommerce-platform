import { CustomPagination } from "@/components/CustomPagination";
import { SearchBar } from "@/components/common/SearchBar";

import { filterProducts } from "@/lib/filters/product";
import { getAllProducts } from "@/lib/services/product";

import { FilterBadges } from "./_components/FilterBadges";
import { ProductAside } from "./_components/ProductAside";
import { ProductGrid } from "./_components/ProductGrid";

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
  const organic = getStringParam(params.organic);
  const currentPage = Math.max(1, Number(params.page) || 1);

  const { products: allData } = await getAllProducts();

  const filteredProducts = filterProducts(allData, {
    q,
    origin,
    type,
    organic,
  });

  const totalProduct = filteredProducts.length;
  const totalPages = Math.ceil(totalProduct / 10) || 1;
  const startIndex = (currentPage - 1) * 10;
  const products = filteredProducts.slice(startIndex, startIndex + 10);

  // 用於清除過濾器的 URL (保留搜尋關鍵字 q)
  const allProductsUrl = q ? `/products?q=${q}` : "/products";

  return (
    <div className="container mx-auto px-1 py-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
        {/* 左側選單 (或行動端 Popover) */}
        <ProductAside allProductsUrl={allProductsUrl} />

        <main className="flex flex-col md:col-span-9">
          <div className="mb-6 w-full">
            <SearchBar />
          </div>

          {/* 目前套用的過濾標籤 */}
          <FilterBadges activeFilters={[origin, type, organic]} />

          {/* 產品列表或空狀態 */}
          <ProductGrid products={products} searchQuery={q} />

          {/* 分頁 */}
          <div className="mt-12 flex justify-center">
            <CustomPagination totalPages={totalPages} />
          </div>
        </main>
      </div>
    </div>
  );
}
