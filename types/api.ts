import z from "zod";

export const PaginationSchema = z.object({
  total_pages: z.number(),
  current_page: z.number(),
  has_pre: z.boolean(),
  has_next: z.boolean(),
  category: z.string().nullable(),
});
export type Pagination = z.infer<typeof PaginationSchema>;

export const BaseResponseSchema = z.object({
  success: z.boolean(),
  message: z.string().optional(),
});
