import {
  AddToCartResponse,
  GetCartResponse,
  PostCartRequest,
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
  }),
  overrideExisting: false,
});

export const { useGetCartQuery, useAddToCartMutation } = cartApi;
