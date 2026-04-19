import { PostOrderRequest } from '@freshfarm/types';

import { baseApi } from "./baseApi";

const OrderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postOrder: builder.mutation<void, PostOrderRequest>({
      query: (body) => ({
        url: "/order",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Order", "Cart"],
    }),
  }),
});

export const { usePostOrderMutation } = OrderApi;
