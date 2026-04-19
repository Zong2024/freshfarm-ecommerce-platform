import z from "zod";

import { CartProductSchema } from "./product";

// Order-specific pagination schema with different category field type
// (api.ts PaginationSchema has category: z.string().nullable())
export const OrderPaginationSchema = z.object({
  total_pages: z.number(),
  current_page: z.number(),
  has_pre: z.boolean(),
  has_next: z.boolean(),
  category: z.string().optional().or(z.literal("")),
});

export const OrderUserSchema = z.object({
  address: z.string().min(1, "地址為必填"),
  email: z.string().email("格式不正確"),
  name: z.string().min(1, "姓名為必填"),
  tel: z.string(),
});

export const OrderProductSchema = z.object({
  id: z.string(),
  product_id: z.string(),
  qty: z.coerce.number().int().positive(),
  total: z.number(),
  final_total: z.number(),
  product: CartProductSchema,
});

export const OrderSchema = z.object({
  id: z.string(),
  create_at: z.number(),
  is_paid: z.boolean(),
  message: z.string().optional().default(""),
  total: z.number(),
  num: z.number(),
  user: OrderUserSchema,
  products: z
    .record(z.string(), OrderProductSchema)
    .transform((val) => Object.values(val)),
  paid_date: z.number().optional(),
});

export const OrderResponseSchema = z.object({
  success: z.boolean(),
  orders: z.array(OrderSchema),
  pagination: OrderPaginationSchema,
  messages: z.array(z.string()),
});

export type OrderResponse = z.infer<typeof OrderResponseSchema>;
export type Order = z.infer<typeof OrderSchema>;
export type OrderUser = z.infer<typeof OrderUserSchema>;
export type OrderProduct = z.infer<typeof OrderProductSchema>;