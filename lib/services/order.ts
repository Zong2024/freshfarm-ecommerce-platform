import { cookies } from "next/headers";

import { OrderResponse, OrderResponseSchema } from "@/types/order";

import { baseUrl } from "./api";

export const getOrders = async (page = 1): Promise<OrderResponse> => {
  const defaultData: OrderResponse = {
    success: false,
    orders: [],
    pagination: {
      total_pages: 0,
      current_page: 1,
      has_pre: false,
      has_next: false,
      category: "",
    },
    messages: [],
  };
  try {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("token")?.value;
    if (!token) return defaultData;

    const response = await fetch(`${baseUrl}/orders?page=${page}`, {
      headers: {
        Authorization: token,
      },
      next: {
        revalidate: 60,
      },
    });
    if (!response.ok) return defaultData;
    const data = await response.json();
    const result = OrderResponseSchema.safeParse(data);
    if (!result.success) {
      console.error("[getOrders] Validation failed:", result.error.format());
      return defaultData;
    }
    return result.data;
  } catch (error) {
    console.error("[getOrders] Unexpected error fetching orders:", error);
    return defaultData;
  }
};
