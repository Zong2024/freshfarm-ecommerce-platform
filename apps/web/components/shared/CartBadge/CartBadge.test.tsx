import { useCart } from "@/hooks/useCart";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { CartBadge } from "./CartBadge";

vi.mock("@/hooks/useCart", () => ({
  useCart: vi.fn(),
}));

const mockedUseCart = vi.mocked(useCart);

describe("CartBadge 組件", () => {
  const setupMockCart = (overrides = {}) => {
    mockedUseCart.mockReturnValue({
      cartTotalQty: 0,
      isLoading: false,
      isError: false,
      hasHydrated: true,
      addToCart: vi.fn(),
      handleDelete: vi.fn(),
      handleUpdate: vi.fn(),
      cartItems: [],
      isCartHydrated: false,
      mergeCart: vi.fn(),
      ...overrides,
    });
  };
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("在水合完成前，應顯示圖示而不是連結", () => {
    setupMockCart({
      hasHydrated: false,
      cartTotalQty: 10,
    });

    render(<CartBadge />);

    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(screen.queryByText("10")).not.toBeInTheDocument();
  });

  it("當購物車無商品時，不應顯示任何數字", () => {
    setupMockCart({
      cartTotalQty: 0,
    });

    render(<CartBadge />);

    expect(
      screen.getByRole("link", { name: /查看購物車/i })
    ).toBeInTheDocument();
    expect(screen.queryByText("0")).not.toBeInTheDocument();
  });

  it("當 isLoading 為真時，即便有商品也不應顯示數字", () => {
    setupMockCart({ isLoading: true, cartTotalQty: 5 });
    render(<CartBadge />);
    expect(screen.queryByText("5")).not.toBeInTheDocument();
  });

  it("當 isError 為真時，不應顯示數字", () => {
    setupMockCart({
      isError: true,
      cartTotalQty: 10,
    });

    render(<CartBadge />);
    expect(screen.queryByText("10")).not.toBeInTheDocument();
  });

  it("當購物車有 5 個商品時，應正確顯示數字 5", () => {
    setupMockCart({
      cartTotalQty: 5,
    });

    render(<CartBadge />);

    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("當使用者新增商品時，CartBadge 應更新數量", () => {
    const { rerender } = render(<CartBadge />);

    setupMockCart({
      cartTotalQty: 0,
    });

    rerender(<CartBadge />);

    expect(screen.queryByText("0")).not.toBeInTheDocument();

    setupMockCart({
      cartTotalQty: 3,
    });

    rerender(<CartBadge />);

    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("當購物車有 99 個商品時，應正確顯示 99", () => {
    setupMockCart({
      cartTotalQty: 99,
    });

    render(<CartBadge />);

    expect(screen.getByText("99")).toBeInTheDocument();
  });

  it("當購物車超過 99 個商品時，應正確顯示 99+", () => {
    setupMockCart({
      cartTotalQty: 100,
    });

    render(<CartBadge />);

    expect(screen.getByText("99+")).toBeInTheDocument();
  });

  it("應具備正確的連結路徑 /cart", () => {
    setupMockCart();

    render(<CartBadge />);
    const link = screen.getByRole("link", { name: /查看購物車/i });
    expect(link).toHaveAttribute("href", "/cart");
  });
});
