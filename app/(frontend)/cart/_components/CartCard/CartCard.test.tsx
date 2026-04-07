import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { CartCard } from "./CartCard";

describe("CartCard 組件", () => {
  it("當購物車無商品時應顯示空狀態訊息", () => {
    render(<CartCard cartItems={[]} onUpdate={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText("購物車目前無商品")).toBeInTheDocument();
  });
});
