import { GetProductsResponseSchema } from "@/types/product";
import { baseUrl } from "./api";

export const getProducts = async (page = 1) => {
  const response = await fetch(`${baseUrl}/products?page=${page}`, {
    next: {
      revalidate: 60,
    },
  });
  if (!response.ok) throw new Error("Failed to fetch data");
  const data = await response.json();
  const validatedData = GetProductsResponseSchema.parse(data);
  return validatedData;
};
