import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ProductCard } from "./ProductCard";

// Mock AddToCartIconButton
vi.mock("../AddToCartIconButton", () => ({
  AddToCartIconButton: () => <button>Mock Add To Cart</button>,
}));

describe("ProductCard 組件", () => {
  const mockProduct = {
    id: "1",
    title: "測試商品",
    category: "水果",
    description: "測試描述",
    price: 100,
    origin_price: 150,
    imageUrl: "/test.jpg",
  } as any;

  it("應正確渲染商品標題與價格", () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText("測試商品")).toBeInTheDocument();
    expect(screen.getByText(/NT\$ 100/)).toBeInTheDocument();
  });
});
