import { notFound } from "next/navigation";

import {
  GetAllProductsResponseSchema,
  GetProductResponseSchema,
  GetProductsResponseSchema,
} from '@freshfarm/types';

import { baseUrl } from "./api";

export const getProduct = async (id: string) => {
  try {
    const response = await fetch(`${baseUrl}/product/${id}`, {
      next: {
        revalidate: 60,
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`[getProduct] Product ${id} not found.`);
        notFound();
      }
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const result = GetProductResponseSchema.safeParse(data);

    if (!result.success) {
      console.error("[getProduct] Validation failed:", result.error.format());
      throw new Error("Invalid product data format received from API");
    }

    return result.data.product;
  } catch (error) {
    if ((error as Error).message === "NEXT_NOT_FOUND") {
      throw error;
    }
    console.error(
      `[getProduct] Unexpected error fetching product ${id}:`,
      error
    );
    throw error;
  }
};

export const getProducts = async (page = 1) => {
  const defaultData = {
    success: false,
    products: [],
    pagination: {
      total_pages: 0,
      current_page: page,
      has_pre: false,
      has_next: false,
      category: null,
    },
  };

  try {
    const response = await fetch(`${baseUrl}/products?page=${page}`, {
      next: {
        revalidate: 60,
      },
    });

    if (!response.ok) {
      console.error(
        "[getProducts] API Error:",
        response.status,
        response.statusText
      );
      return defaultData;
    }

    const data = await response.json();
    const result = GetProductsResponseSchema.safeParse(data);

    if (!result.success) {
      console.error("[getProducts] Validation failed:", result.error.format());
      return defaultData;
    }

    return result.data;
  } catch (error) {
    console.error(
      `[getProducts] Unexpected error fetching products page ${page}:`,
      error
    );
    return defaultData;
  }
};

export const getAllProducts = async () => {
  const defaultData = {
    success: false,
    products: [],
  };

  try {
    const response = await fetch(`${baseUrl}/products/all`, {
      next: {
        revalidate: 60,
      },
    });

    if (!response.ok) {
      console.error(
        "[getAllProducts] API Error:",
        response.status,
        response.statusText
      );
      return defaultData;
    }

    const data = await response.json();
    const result = GetAllProductsResponseSchema.safeParse(data);

    if (!result.success) {
      console.error(
        "[getAllProducts] Validation failed:",
        result.error.format()
      );
      return defaultData;
    }

    return result.data;
  } catch (error) {
    console.error(
      "[getAllProducts] Unexpected error fetching all products:",
      error
    );
    return defaultData;
  }
};
