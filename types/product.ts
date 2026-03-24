import z from "zod";

import { BaseResponseSchema, Pagination, PaginationSchema } from "./api";

export const ProductSchema = z.object({
  id: z.string(),
  title: z.string(),
  category: z.string(),
  description: z.string(),
  content: z.string(),
  imageUrl: z.string(),
  imagesUrl: z.array(z.string()).optional().default([]),
  price: z.number(),
  origin_price: z.number(),
  is_enabled: z.number(),
  unit: z.string(),
  farm: z.string().optional(),
  origin: z.string().optional(),
  weight: z.string().optional(),
  num: z.number().optional(),
  eating_tips: z.string().optional(),
  origin_info: z.string().optional(),
  shelf_life: z.string().optional(),
  storage_method: z.string().optional(),
});

export type Product = z.infer<typeof ProductSchema>;

export const CartProductSchema = ProductSchema.pick({
  id: true,
  title: true,
  price: true,
  imageUrl: true,
});
export type CartProduct = z.infer<typeof CartProductSchema>;

export const GetProductResponseSchema = BaseResponseSchema.extend({
  product: ProductSchema,
});

export const GetProductsResponseSchema = BaseResponseSchema.extend({
  products: z.array(ProductSchema),
  pagination: PaginationSchema,
});

export const GetAllProductsResponseSchema = BaseResponseSchema.extend({
  products: z.array(ProductSchema),
});

export type GetProductResponseSchema = z.infer<typeof GetProductResponseSchema>;
export type GetProductsResponse = z.infer<typeof GetProductsResponseSchema>;
export type GetAllProductsResponse = z.infer<
  typeof GetAllProductsResponseSchema
>;

export type ProductListUI = {
  products: Product[];
  pagination: Pagination;
};
