import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { HOME_CATEGORY_SECTIONS } from "@/lib/constants";

import { CategorySection } from "./CategorySection";

describe("CategorySection Component", () => {
  it("應預設顯示第一個分類的內容", () => {
    render(<CategorySection />);
    const firstCategory = HOME_CATEGORY_SECTIONS[0]!;

    expect(
      screen.getByRole("heading", { name: firstCategory.title, level: 2 })
    ).toBeDefined();
    expect(screen.getByText(firstCategory.description)).toBeDefined();
  });

  it("點擊不同分類按鈕時，應切換對應內容", async () => {
    const user = userEvent.setup();
    render(<CategorySection />);
    const secondCategory = HOME_CATEGORY_SECTIONS[1]!;

    const button = screen.getByRole("button", {
      name: `切換至${secondCategory.title}分類`,
    });

    await user.click(button);

    expect(button).toHaveAttribute("aria-current", "true");
  });
});
