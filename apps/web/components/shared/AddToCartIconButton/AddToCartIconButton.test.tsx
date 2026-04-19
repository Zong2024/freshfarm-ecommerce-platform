import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { AddToCartIconButton } from "./AddToCartIconButton";

vi.mock("@/hooks/useCart", () => ({
  useCart: vi.fn(() => ({
    addToCart: vi.fn(),
    isLoading: false,
    hasHydrated: true,
  })),
}));

describe("AddToCartIconButton 組件", () => {
  it("應渲染按鈕圖示", () => {
    const { container } = render(<AddToCartIconButton product={{} as any} />);
    const icon = container.querySelector("svg");
    expect(icon).toBeInTheDocument();
  });
});
