import Cookies from "js-cookie";

import { CustomToast } from "@/components/shared/CustomToast";

import {
  addToLocalCart,
  clearLocalCart,
  deleteFromLocalCart,
  updateLocalCart,
} from "@/lib/store/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  useDeleteCartMutation,
  useGetCartQuery,
  usePostCartMutation,
  useUpdateCartMutation,
} from "@/lib/store/services/cartApi";

import { CartProduct, CartProductSchema } from '@freshfarm/types';

import { useHasHydrated } from "./useHasHydrated";

export const useCart = () => {
  const dispatch = useAppDispatch();
  const hasHydrated = useHasHydrated();
  const { isAuthenticated, isInitialized } = useAppSelector(
    (state) => state.auth
  );
  const isCartHydrated = useAppSelector((state) => state.cart.isHydrated);
  const LocalCartItem = useAppSelector((state) => state.cart.items);

  const [postCart] = usePostCartMutation();
  const [deleteCart] = useDeleteCartMutation();
  const [updateCart] = useUpdateCartMutation();
  const {
    data: apiCartData,
    isLoading,
    isError,
  } = useGetCartQuery(undefined, {
    skip: !isAuthenticated || !isInitialized,
  });
  const hasToken = !!Cookies.get("token");
  const isAuthPending = hasToken && !isInitialized;
  const isActionLoading =
    !isCartHydrated || !isInitialized || isAuthPending || isLoading;
  const cartItems = isAuthenticated ? apiCartData?.carts || [] : LocalCartItem;
  const cartTotalQty = cartItems.reduce(
    (acc: number, item) => acc + item.qty,
    0
  );
  const addToCart = async (product: CartProduct, qty: number = 1) => {
    try {
      const validatedProduct = CartProductSchema.parse(product);
      if (isAuthenticated) {
        await postCart({ product_id: validatedProduct.id, qty }).unwrap();
        CustomToast("success", "加入購物車成功");
      } else {
        dispatch(addToLocalCart({ product: validatedProduct, qty }));
        CustomToast("success", "加入購物車成功");
      }
    } catch (error) {
      console.error("加入購物車失敗:", error);
      CustomToast("warning", "加入失敗，請稍後再試。");
    }
  };
  const handleDelete = async (id: string) => {
    try {
      if (isAuthenticated) {
        await deleteCart(id).unwrap();
        CustomToast("success", "移除商品成功");
      } else {
        dispatch(deleteFromLocalCart(id));
        CustomToast("success", "移除商品成功");
      }
    } catch (error) {
      console.error("移除商品失敗", error);
      CustomToast("warning", "移除失敗，請稍後再試。");
    }
  };
  const handleUpdate = async (id: string, product_id: string, qty: number) => {
    try {
      if (isAuthenticated) {
        await updateCart({ id, product_id, qty }).unwrap();
        CustomToast("success", "更新數量成功");
      } else {
        dispatch(updateLocalCart({ product_id, qty }));
        CustomToast("success", "更新數量成功");
      }
    } catch (error) {
      console.error("更新數量失敗", error);
    }
  };
  const mergeCart = async () => {
    if (LocalCartItem.length === 0) return;
    try {
      const promises = LocalCartItem.map((item) =>
        postCart({ product_id: item.product_id, qty: item.qty }).unwrap()
      );
      await Promise.all(promises);
      dispatch(clearLocalCart());
    } catch (error) {}
  };

  return {
    addToCart,
    handleDelete,
    handleUpdate,
    cartTotalQty,
    cartItems,
    mergeCart,
    isLoading: isActionLoading,
    isError,
    hasHydrated,
    isCartHydrated,
  };
};
