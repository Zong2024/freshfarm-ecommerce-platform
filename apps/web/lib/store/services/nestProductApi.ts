import {
  GetAllProductsResponseSchema,
  GetProductsResponseSchema,
  GetProductResponseSchema,
  Product,
  ProductListUI,
} from '@freshfarm/types';

import { nestApi } from './nestApi';

export const nestProductApi = nestApi.injectEndpoints({
  endpoints: (builder) => ({
    getNestProducts: builder.query<ProductListUI, number | void>({
      query: (page = 1) => `/products?page=${page}`,
      transformResponse: (response: unknown): ProductListUI => {
        const validatedData = GetProductsResponseSchema.parse(response);
        return {
          products: validatedData.products,
          pagination: validatedData.pagination,
        };
      },
      providesTags: ['NestProduct'],
    }),
    getNestAllProducts: builder.query<Product[], void>({
      query: () => '/products/all',
      transformResponse: (response: unknown): Product[] => {
        const validatedData = GetAllProductsResponseSchema.parse(response);
        return validatedData.products;
      },
      providesTags: ['NestProduct'],
    }),
    getNestProduct: builder.query<Product, string>({
      query: (id) => `/products/${id}`,
      transformResponse: (response: unknown): Product => {
        const validatedData = GetProductResponseSchema.parse(response);
        return validatedData.product;
      },
      providesTags: (result, error, id) => [{ type: 'NestProduct', id }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetNestProductsQuery,
  useGetNestAllProductsQuery,
  useGetNestProductQuery,
} = nestProductApi;