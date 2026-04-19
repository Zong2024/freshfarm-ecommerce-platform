import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { AddToCartFullButton } from "./AddToCartFullButton";

vi.mock("@/hooks/useCart", () => ({
  useCart: vi.fn(() => ({
    addToCart: vi.fn(),
    isLoading: false,
  })),
}));

describe("AddToCartFullButton 組件", () => {
  it("應顯示加入購物車文字", () => {
    render(<AddToCartFullButton product={{} as any} />);
    expect(screen.getByText(/加入購物車/)).toBeInTheDocument();
  });
});
