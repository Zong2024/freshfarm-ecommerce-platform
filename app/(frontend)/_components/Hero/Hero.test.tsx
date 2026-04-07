import type { ImageProps } from "next/image";

import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Hero } from "./Hero";

vi.mock("next/image", () => ({
  __esModule: true,
  default: (props: ImageProps) => {
    return (
      <img
        src={typeof props.src === "string" ? props.src : undefined}
        alt={props.alt}
      />
    );
  },
}));

describe("Hero 組件", () => {
  it("應正確渲染標題與副標題", () => {
    render(
      <Hero title="從產地到餐桌的直線距離" subtitle="把產地的鮮活，直送你家" />
    );

    expect(screen.getByText("從產地到餐桌的直線距離")).toBeInTheDocument();
    expect(screen.getByText("把產地的鮮活，直送你家")).toBeInTheDocument();
  });
});
