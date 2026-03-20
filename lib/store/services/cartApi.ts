import {
  AddToCartResponse,
  GetCartResponse,
  PostCartRequest,
  UpdateCartRequest,
} from "@/types/cart";

import { baseApi } from "./baseApi";

export const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query<GetCartResponse, void>({
      query: () => ({
        url: "/cart",
      }),
      providesTags: ["Cart"],
    }),
    addToCart: builder.mutation<AddToCartResponse, PostCartRequest>({
      query: (body) => ({
        url: "/cart",
        method: "POST",
        body: { data: body },
      }),
      invalidatesTags: ["Cart"],
    }),
    deleteCart: builder.mutation<void, string>({
      query: (id) => ({
        url: `/cart/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
    updateCart: builder.mutation<void, UpdateCartRequest>({
      query: (data) => ({
        url: `/cart/${data.id}`,
        method: "PUT",
        body: {
          data: {
            product_id: data.product_id,
            qty: data.qty,
          },
        },
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useDeleteCartMutation,
  useUpdateCartMutation,
} = cartApi;
