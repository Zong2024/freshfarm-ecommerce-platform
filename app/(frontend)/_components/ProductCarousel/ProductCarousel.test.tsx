import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ProductCarousel } from "./ProductCarousel";

describe("ProductCarousel 組件", () => {
  it("資料為空時應正確渲染（不顯示內容）", () => {
    const { container } = render(<ProductCarousel products={[]} />);
    expect(container.firstChild).toBeNull();
  });
});
