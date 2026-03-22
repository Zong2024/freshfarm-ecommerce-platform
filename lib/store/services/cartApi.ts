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
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          cartApi.util.updateQueryData("getCart", undefined, (draft) => {
            const index = draft.data.carts.findIndex((c) => c.id === id);
            if (index !== -1) {
              draft.data.carts.splice(index, 1);
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
      invalidatesTags: ["Cart"],
      async onQueryStarted({ id, qty }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          cartApi.util.updateQueryData("getCart", undefined, (draft) => {
            const item = draft.data.carts.find((c) => c.id === id);
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
  useAddToCartMutation,
  useDeleteCartMutation,
  useUpdateCartMutation,
} = cartApi;
