import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SectionHeader } from "./SectionHeader";

describe("SectionHeader Component", () => {
  const defaultProps = {
    badge: "新品上市",
    title: "新鮮蔬果",
    subtitle: "每日產地直送，保證新鮮。",
  };

  it("應正確渲染 badge, title 與 subtitle", () => {
    render(<SectionHeader {...defaultProps} />);

    expect(screen.getByText(defaultProps.badge)).toBeDefined();
    expect(screen.getByText(defaultProps.title)).toBeDefined();
    expect(screen.getByText(defaultProps.subtitle)).toBeDefined();
  });

  it("應包含裝飾性的邊框元素", () => {
    const { container } = render(<SectionHeader {...defaultProps} />);
    const decorativeLine = container.querySelector(".bg-primary-400");
    expect(decorativeLine).toBeDefined();
  });
});
