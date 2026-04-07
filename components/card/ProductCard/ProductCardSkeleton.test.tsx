import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ProductCardSkeleton } from "./ProductCardSkeleton";

describe("ProductCardSkeleton Component", () => {
  it("應正確渲染骨架元素", () => {
    const { container } = render(<ProductCardSkeleton />);
    const skeletons = container.querySelectorAll('[data-slot="skeleton"]');
    expect(skeletons.length).toBeGreaterThan(0);
  });
});
