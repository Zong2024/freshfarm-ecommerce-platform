import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { SearchBar } from "./SearchBar";
import { SearchInput } from "./SearchInput";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
  usePathname: vi.fn(),
  useSearchParams: vi.fn(),
}));

describe("SearchBar Component", () => {
  const mockPush = vi.fn();
  const mockPathname = "/products";

  const setupMocks = (queryString: string = "") => {
    vi.mocked(useRouter).mockReturnValue({
      push: mockPush,
    } as unknown as ReturnType<typeof useRouter>);
    vi.mocked(usePathname).mockReturnValue(mockPathname);
    vi.mocked(useSearchParams).mockReturnValue(
      new URLSearchParams(queryString) as unknown as ReadonlyURLSearchParams
    );
  };
  beforeEach(() => {
    vi.clearAllMocks();
    setupMocks();
  });

  it("應正確顯示初始值和placeholder", () => {
    setupMocks("q=香蕉");
    render(<SearchInput placeholder="搜尋商品..." />);

    expect(screen.getByPlaceholderText("搜尋商品...")).toHaveValue("香蕉");
  });

  it("應跳轉至正確 URL 並移除 page 參數", async () => {
    const user = userEvent.setup();
    setupMocks("q=葡萄&page=2");

    render(<SearchInput />);
    const input = screen.getByRole("textbox", { name: /搜尋產品/ });
    await user.clear(input);
    await user.type(input, "香蕉{enter}");

    expect(mockPush).toHaveBeenCalledWith("/products?q=%E9%A6%99%E8%95%89");
  });

  it("若輸入框為空，應從 URL 中移除 q 參數", async () => {
    const user = userEvent.setup();
    setupMocks("q=香蕉");
    render(<SearchInput />);

    const input = screen.getByRole("textbox");
    await user.clear(input);
    await user.type(input, "{enter}");

    expect(mockPush).toHaveBeenCalledWith("/products?");
  });
});
