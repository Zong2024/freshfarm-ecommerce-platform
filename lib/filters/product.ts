import { getRegion } from "@/lib/utils";

import { Product } from "@/types/product";

export interface ProductFilters {
  q?: string;
  origin?: string;
  type?: string;
  organic?: string;
}

export function filterProducts(products: Product[], filters: ProductFilters) {
  const { q = "", origin, type } = filters;
  const lowercaseQ = q.toLowerCase();

  return products.filter((product) => {
    // 1. 啟用狀態
    if (product.is_enabled !== 1) return false;

    // 2. 關鍵字搜尋
    if (q && !product.title.toLowerCase().includes(lowercaseQ)) return false;

    // 3. 產地過濾 (地區對應)
    if (origin) {
      const productRegion = getRegion(product.origin || "");
      if (productRegion !== origin) return false;
    }

    // 4. 品項過濾
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
}
