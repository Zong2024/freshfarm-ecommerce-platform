import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { LocalCartItem } from "@/types/cart";
import { CartProduct } from "@/types/product";

export interface CartItem {
  items: LocalCartItem[];
  isHydrated: boolean;
}

const initialState: CartItem = {
  items: [],
  isHydrated: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    hydrateLocalCart: (state, action: PayloadAction<LocalCartItem[]>) => {
      state.items = action.payload;
      state.isHydrated = true;
    },
    setCartHydrated: (state) => {
      state.isHydrated = true;
    },
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
    deleteFromLocalCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateLocalCart: (
      state,
      action: PayloadAction<{ product_id: string; qty: number }>
    ) => {
      const { product_id, qty } = action.payload;
      const existingItem = state.items.find(
        (item) => item.product_id === product_id
      );
      if (existingItem) {
        existingItem.qty = qty;
        existingItem.total = qty * existingItem.product.price;
        existingItem.final_total = qty * existingItem.product.price;
      }
    },
    clearLocalCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToLocalCart,
  hydrateLocalCart,
  deleteFromLocalCart,
  updateLocalCart,
  clearLocalCart,
  setCartHydrated,
} = cartSlice.actions;
export default cartSlice.reducer;
