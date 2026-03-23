import { CustomToast } from "@/components/CustomToast";

import { addToLocalCart } from "@/lib/store/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { usePostCartMutation } from "@/lib/store/services/cartApi";

import { CartProduct, CartProductSchema } from "@/types/product";

export const useCart = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [postCart, { isLoading }] = usePostCartMutation();

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

  return { addToCart, isLoading };
};
