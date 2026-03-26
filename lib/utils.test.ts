import { describe, expect, it } from "vitest";

import { cn } from "./utils";

describe("cn utility function", () => {
  it("should merge class names correctly", () => {
    expect(cn("px-2", "py-2")).toBe("px-2 py-2");
  });

  it("should handle conditional classes", () => {
    expect(cn("px-2", true && "py-2", false && "mt-4")).toBe("px-2 py-2");
  });

  it("should merge Tailwind classes correctly (tw-merge)", () => {
    // Both p-4 and p-2 are padding, p-2 should override p-4
    expect(cn("p-4", "p-2")).toBe("p-2");
  });

  it("should handle null or undefined", () => {
    expect(cn("px-2", null, undefined, "py-2")).toBe("px-2 py-2");
  });

  it("should handle empty strings", () => {
    expect(cn("px-2", "", "py-2")).toBe("px-2 py-2");
  });
});
