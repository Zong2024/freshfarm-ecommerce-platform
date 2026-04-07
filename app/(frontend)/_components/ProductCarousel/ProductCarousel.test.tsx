import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ProductCarousel } from "./ProductCarousel";

vi.mock("@/lib/store/services/productApi", () => ({
  useGetProductsQuery: vi.fn(() => ({
    data: { products: [] },
    isLoading: false,
    error: null,
  })),
}));

describe("ProductCarousel 組件", () => {
  it("當Api發生error / 資料為空時應正確渲染（不顯示內容）", () => {
    const { container } = render(<ProductCarousel />);
    expect(container.firstChild).toBeNull();
  });
});
