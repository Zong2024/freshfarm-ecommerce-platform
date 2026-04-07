import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ProductActionSection } from "./ProductActionSection";

// Mock hooks and routers
vi.mock("next/navigation", () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
}));

vi.mock("@/hooks/useCart", () => ({
  useCart: vi.fn(() => ({
    addToCart: vi.fn(),
    isLoading: false,
  })),
}));

describe("ProductActionSection 組件", () => {
  const mockProduct = {
    id: "1",
    title: "測試商品",
    price: 100,
    imageUrl: "/test.jpg",
  };

  it("應渲染直接購買按鈕", () => {
    render(<ProductActionSection product={mockProduct} />);
    expect(screen.getByText("直接購買")).toBeDefined();
  });
});
