import { describe, expect, it } from "vitest";

import { cn } from "./utils";

describe("cn 工具函式", () => {
  it("應正確合併類名", () => {
    expect(cn("px-2", "py-2")).toBe("px-2 py-2");
  });

  it("應處理條件類名", () => {
    expect(cn("px-2", true && "py-2", false && "mt-4")).toBe("px-2 py-2");
  });

  it("應正確合併 Tailwind 類名並處理衝突 (tw-merge)", () => {
    // p-4 與 p-2 都是 padding，p-2 應覆蓋 p-4
    expect(cn("p-4", "p-2")).toBe("p-2");
  });

  it("應處理 null 或 undefined", () => {
    expect(cn("px-2", null, undefined, "py-2")).toBe("px-2 py-2");
  });

  it("應處理空字串", () => {
    expect(cn("px-2", "", "py-2")).toBe("px-2 py-2");
  });
});
