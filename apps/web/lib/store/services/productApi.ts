import { GetProductsResponseSchema, ProductListUI } from '@freshfarm/types';
import { baseApi } from "./baseApi";

export const ProductApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ProductListUI, number | void>({
      query: (page = 1) => `/products?page=${page}`,
      transformResponse: (response: unknown): ProductListUI => {
        const validatedData = GetProductsResponseSchema.parse(response);
        return {
          products: validatedData.products,
          pagination: validatedData.pagination,
        };
      },
      providesTags: ["Product"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetProductsQuery } = ProductApi;
