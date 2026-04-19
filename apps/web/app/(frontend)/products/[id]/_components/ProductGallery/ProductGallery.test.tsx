import type { ImageProps } from "next/image";

import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ProductGallery } from "./ProductGallery";

// Mock next/image
vi.mock("next/image", () => ({
  __esModule: true,
  default: (props: ImageProps) => {
    const src =
      typeof props.src === "string"
        ? props.src
        : (props.src as unknown as { src: string }).src;
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={props.alt} />;
  },
}));

describe("ProductGallery 組件", () => {
  it("應正確渲染主圖", () => {
    render(
      <ProductGallery mainImage="/test-image.jpg" productTitle="測試商品" />
    );

    const mainImg = screen.getByAltText("測試商品");
    expect(mainImg).toBeDefined();
    expect(mainImg).toHaveAttribute("src", "/test-image.jpg");
  });
});
