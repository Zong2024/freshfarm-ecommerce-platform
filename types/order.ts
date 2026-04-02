import z from "zod";

export const PaginationSchema = z.object({
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
});

export const OrderSchema = z.object({
  id: z.string(),
  create_at: z.number(),
  is_paid: z.boolean(),
  message: z.string().catch(""),
  num: z.number(),
  user: OrderUserSchema,
  products: z.array(OrderProductSchema),
});

export const OrderResponseSchema = z.object({
  success: z.boolean(),
  orders: z.array(OrderSchema),
  pagination: PaginationSchema,
  messages: z.array(z.string()),
});

export type OrderResponse = z.infer<typeof OrderResponseSchema>;
export type Order = z.infer<typeof OrderSchema>;
export type OrderUser = z.infer<typeof OrderUserSchema>;
