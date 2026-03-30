import { useCart } from "@/hooks/useCart";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { CartBadge } from "./CartBadge";

vi.mock("@/hooks/useCart", () => ({
  useCart: vi.fn(),
}));

const mockedUseCart = vi.mocked(useCart);

describe("CartBadge Components", () => {
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

  it("在hydration完成前，應顯示圖示而不是Link", () => {
    setupMockCart({
      hasHydrated: false,
      cartTotalQty: 10,
    });

    render(<CartBadge />);

    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(screen.queryByText("10")).not.toBeInTheDocument();
  });

  it("當購物車無商品時,不能顯示任何數字", () => {
    setupMockCart({
      cartTotalQty: 0,
    });

    render(<CartBadge />);

    expect(
      screen.getByRole("link", { name: /View Shopping Cart/i })
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

  it("當使用者新增商品時,CartBadge會新增數量", () => {
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

  it("當購物車99個商品時，應正確顯示99", () => {
    setupMockCart({
      cartTotalQty: 99,
    });

    render(<CartBadge />);

    expect(screen.getByText("99")).toBeInTheDocument();
  });

  it("當購物車超過99個商品時，應正確顯示99+", () => {
    setupMockCart({
      cartTotalQty: 100,
    });

    render(<CartBadge />);

    expect(screen.getByText("99+")).toBeInTheDocument();
  });

  it("正確連結路徑 /cart", () => {
    setupMockCart();

    render(<CartBadge />);
    const link = screen.getByRole("link", { name: /View Shopping Cart/i });
    expect(link).toHaveAttribute("href", "/cart");
  });
});
