import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { CustomPagination } from "./CustomPagination";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  usePathname: vi.fn(() => "/products"),
  useSearchParams: vi.fn(() => new URLSearchParams()),
}));

describe("CustomPagination 組件", () => {
  it("當總頁數大於 1 時應渲染分頁內容", () => {
    render(<CustomPagination totalPages={5} />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("當總頁數為 1 時不應渲染內容", () => {
    const { container } = render(<CustomPagination totalPages={1} />);
    expect(container.firstChild).toBeNull();
  });
});
