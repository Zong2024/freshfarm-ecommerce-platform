import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { CartTable } from "./CartTable";

describe("CartTable 組件", () => {
  it("應正確渲染表格欄位標題", () => {
    render(<CartTable cartItems={[]} onUpdate={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText("商品資訊")).toBeInTheDocument();
  });
});
