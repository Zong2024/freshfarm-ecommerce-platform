import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { LocalCartItem } from "@/types/cart";
import { CartProduct, Product } from "@/types/product";

export interface CartItem {
  items: LocalCartItem[];
}

const initialState: CartItem = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToLocalCart: (
      state,
      action: PayloadAction<{ product: CartProduct; qty: number }>
    ) => {
      const { product, qty } = action.payload;
      const existingItem = state.items.find(
        (item) => item.product_id === product.id
      );
      if (existingItem) {
        existingItem.qty += qty;
        existingItem.total = existingItem.qty * product.price;
        existingItem.final_total = existingItem.total;
      } else {
        const newItem = {
          id: `Local-${product.id}`,
          product_id: product.id,
          qty,
          total: qty * product.price,
          final_total: qty * product.price,
          product,
        };
        state.items.push(newItem);
      }
    },
  },
});

export const { addToLocalCart } = cartSlice.actions;
export default cartSlice.reducer;
