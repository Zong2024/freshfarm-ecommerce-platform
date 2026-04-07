import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ActionFullButton } from "./ActionFullButton";

describe("ActionFullButton 組件", () => {
  it("應正確渲染子內容", () => {
    render(<ActionFullButton>測試按鈕</ActionFullButton>);
    expect(screen.getByText("測試按鈕")).toBeInTheDocument();
  });

  it("載入中狀態時應顯示載入圖示", () => {
    const { container } = render(
      <ActionFullButton isLoading>測試按鈕</ActionFullButton>
    );
    const loader = container.querySelector(".animate-spin");
    expect(loader).toBeInTheDocument();
  });
});
