import z from "zod";

import { ProductSchema } from "./product";

export const CartItemSchema = z.object({
  id: z.string(),
  product_id: z.string(),
  qty: z.number(),
  total: z.number(),
  final_total: z.number(),
  product: ProductSchema,
});

export type CartItem = z.infer<typeof CartItemSchema>;

export const getCartResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    carts: z.array(CartItemSchema),
    total: z.number(),
    final_total: z.number(),
  }),
  message: z.array(z.string()),
});

export type GetCartResponse = z.infer<typeof getCartResponseSchema>;

export const PostCartRequestSchema = z.object({
  product_id: z.string(),
  qty: z.number(),
});

export type PostCartRequest = z.infer<typeof PostCartRequestSchema>;

export const AddToCartResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.object({
    product_id: z.string(),
    qty: z.number(),
    id: z.string(),
    total: z.number(),
    final_total: z.number(),
    product: ProductSchema,
  }),
});

export type AddToCartResponse = z.infer<typeof AddToCartResponseSchema>;
