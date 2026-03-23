import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";

import { addToLocalCart } from "../features/cart/cartSlice";
import { RootState } from "../store";

export const cartSyncMiddleware = createListenerMiddleware();

cartSyncMiddleware.startListening({
  actionCreator: addToLocalCart,
  effect: (action, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    const CartData = state.cart.items;

    try {
      localStorage.setItem("guestCart", JSON.stringify(CartData));
      console.log("攔截到購物車");
    } catch (error) {
      console.error("購物車儲存localStorage失敗", error);
    }
  },
});
