import { notFound } from "next/navigation";

import {
  GetAllProductsResponseSchema,
  GetProductResponseSchema,
  GetProductsResponseSchema,
} from "@freshfarm/types";

import { API_ENDPOINTS } from "@/lib/api/endpoints";

const NEST_API_URL =
  process.env.NEXT_PUBLIC_NEST_API_URL || "http://localhost:3001";

export async function getAllProductsFromNest() {
  const defaultData = {
    success: false,
    products: [],
  };

  try {
    const response = await fetch(
      `${NEST_API_URL}${API_ENDPOINTS.products.all}`,
      {
        next: {
          revalidate: 60,
        },
      },
    );

    if (!response.ok) {
      console.error(
        "[getAllProductsFromNest] API Error:",
        response.status,
        response.statusText,
      );
      return defaultData;
    }

    const data = await response.json();
    const result = GetAllProductsResponseSchema.safeParse(data);

    if (!result.success) {
      console.error(
        "[getAllProductsFromNest] Validation failed:",
        result.error.format(),
      );
      return defaultData;
    }

    return result.data;
  } catch (error) {
    console.error(
      "[getAllProductsFromNest] Unexpected error fetching all products:",
      error,
    );
    return defaultData;
  }
}

export async function getProductsFromNest(page = 1) {
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
    const response = await fetch(
      `${NEST_API_URL}${API_ENDPOINTS.products.list}?page=${page}`,
      {
        next: {
          revalidate: 60,
        },
      },
    );

    if (!response.ok) {
      console.error(
        "[getProductsFromNest] API Error:",
        response.status,
        response.statusText,
      );
      return defaultData;
    }

    const data = await response.json();
    const result = GetProductsResponseSchema.safeParse(data);

    if (!result.success) {
      console.error(
        "[getProductsFromNest] Validation failed:",
        result.error.format(),
      );
      return defaultData;
    }

    return result.data;
  } catch (error) {
    console.error(
      `[getProductsFromNest] Unexpected error fetching products page ${page}:`,
      error,
    );
    return defaultData;
  }
}

export async function getProductFromNest(id: string) {
  try {
    const response = await fetch(
      `${NEST_API_URL}${API_ENDPOINTS.products.detail(id)}`,
      {
        next: {
          revalidate: 60,
        },
      },
    );

    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`[getProductFromNest] Product ${id} not found.`);
        notFound();
      }
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const result = GetProductResponseSchema.safeParse(data);

    if (!result.success) {
      console.error(
        "[getProductFromNest] Validation failed:",
        result.error.format(),
      );
      throw new Error("Invalid product data format received from API");
    }

    return result.data.product;
  } catch (error) {
    if ((error as Error).message === "NEXT_NOT_FOUND") {
      throw error;
    }
    console.error(
      `[getProductFromNest] Unexpected error fetching product ${id}:`,
      error,
    );
    throw error;
  }
}