import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { CategoryAccordion } from "./CategoryAccordion";

const { mockPush } = vi.hoisted(() => ({
  mockPush: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(() => ({
    push: mockPush,
  })),
  usePathname: vi.fn(() => "/products"),
  useSearchParams: vi.fn(() => new URLSearchParams()),
}));

describe("CategoryAccordion 組件", () => {
  const mockData = [{ id: "origin", title: "產地", items: ["台灣"] }];

  const user = userEvent.setup();
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it("應正確渲染分類標題", () => {
    render(<CategoryAccordion CategoryData={mockData} />);
    expect(screen.getByText("產地")).toBeInTheDocument();
  });

  it("點擊分類項目時應觸發路由跳轉至正確的過濾路徑", async () => {
    render(<CategoryAccordion CategoryData={mockData} />);
    await user.click(screen.getByRole("button", { name: /台灣/i }));
    const expectedParam = `origin=${encodeURIComponent("台灣")}`;
    expect(mockPush).toHaveBeenCalledWith(
      expect.stringContaining(expectedParam)
    );
  });
});
