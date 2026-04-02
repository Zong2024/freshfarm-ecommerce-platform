import {
  AddToCartResponse,
  GetCartResponse,
  PostCartRequest,
  UpdateCartRequest,
} from "@/types/cart";

import { baseApi } from "./baseApi";

export const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query<GetCartResponse["data"], void>({
      query: () => ({
        url: "/cart",
      }),
      transformResponse: (response: GetCartResponse) => response.data,
      providesTags: (result) =>
        result
          ? [
              ...result.carts.map(({ id }) => ({
                type: "Cart" as const,
                id,
              })),
              { type: "Cart", id: "LIST" },
            ]
          : [{ type: "Cart", id: "LIST" }],
    }),
    postCart: builder.mutation<AddToCartResponse, PostCartRequest>({
      query: (body) => ({
        url: "/cart",
        method: "POST",
        body: { data: body },
      }),
      invalidatesTags: [{ type: "Cart", id: "LIST" }],
    }),
    deleteCart: builder.mutation<void, string>({
      query: (id) => ({
        url: `/cart/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Cart", id }],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          cartApi.util.updateQueryData("getCart", undefined, (draft) => {
            const index = draft.carts.findIndex((c) => c.id === id);
            if (index !== -1) {
              draft.carts.splice(index, 1);
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
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
      invalidatesTags: (result, error, { id }) => [{ type: "Cart", id }],
      async onQueryStarted({ id, qty }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          cartApi.util.updateQueryData("getCart", undefined, (draft) => {
            const item = draft.carts.find((c) => c.id === id);
            if (item) {
              item.qty = qty;
              item.total = item.product.price * qty;
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetCartQuery,
  usePostCartMutation,
  useDeleteCartMutation,
  useUpdateCartMutation,
} = cartApi;
