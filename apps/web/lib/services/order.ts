import { cookies } from "next/headers";

import { OrderResponse, OrderResponseSchema } from '@freshfarm/types';

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
    if (!token) {
      console.warn("[getOrders] 找不到驗證 Token，請確認使用者是否已登入。");
      return defaultData;
    }

    const response = await fetch(`${baseUrl}/orders?page=${page}`, {
      headers: {
        Authorization: token,
      },
      next: {
        revalidate: 60,
      },
    });
    if (!response.ok) {
      console.error(`[getOrders] API 請求失敗，狀態碼：${response.status}`);
      return defaultData;
    }
    const data = await response.json();

    const result = OrderResponseSchema.safeParse(data);
    if (!result.success) {
      console.error("[getOrders] 資料格式驗證失敗：", result.error.format());
      return defaultData;
    }
    return result.data;
  } catch (error) {
    console.error("[getOrders] 獲取訂單時發生意外錯誤：", error);
    return defaultData;
  }
};
