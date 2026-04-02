import { getRegion } from "@/lib/utils";

import { Product } from "@/types/product";

export type CategoryType = "蔬菜" | "水果" | "水產" | "其他";
export interface ProductFilters {
  q?: string;
  origin?: CategoryType;
  type?: string;
}

export function filterProducts(products: Product[], filters: ProductFilters) {
  const { q = "", origin, type } = filters;
  const lowercaseQ = q.toLowerCase().trim();

  const mainCategories: CategoryType[] = ["蔬菜", "水果", "水產"];
  return products.filter((product) => {
    // 1. 啟用狀態
    if (product.is_enabled !== 1) return false;
    // 2. 關鍵字搜尋
    if (lowercaseQ && !product.title.toLowerCase().includes(lowercaseQ)) {
      return false;
    }
    // 3. 產地過濾 (地區對應)
    if (origin && getRegion(product.origin || "") !== origin) {
      return false;
    }
    // 4. 品項過濾
    if (type) {
      if (type === "其他") {
        if (mainCategories.includes(product.category as CategoryType))
          return false;
      } else {
        if (product.category !== type) return false;
      }
    }

    return true;
  });
}
