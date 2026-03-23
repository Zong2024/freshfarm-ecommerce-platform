import { CustomToast } from "@/components/CustomToast";

import { addToLocalCart } from "@/lib/store/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { usePostCartMutation } from "@/lib/store/services/cartApi";

import { CartProduct, CartProductSchema } from "@/types/product";

export const useCart = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [postCart, { isLoading, error }] = usePostCartMutation();

  const addToCart = async (product: CartProduct, qty: number = 1) => {
    const CartProductData = CartProductSchema.parse(product);
    if (isAuthenticated) {
      try {
        await postCart({ product_id: product.id, qty }).unwrap();
        CustomToast("success", "加入購物車成功");
      } catch (error) {
        console.error("加入購物車失敗:", error);
        CustomToast("warning", "加入失敗，請稍後再試。");
      }
    } else {
      dispatch(addToLocalCart({ product: CartProductData, qty }));
      CustomToast("success", "加入購物車成功");
      console.log(CartProductData);
    }
  };

  return { addToCart, isLoading };
};
