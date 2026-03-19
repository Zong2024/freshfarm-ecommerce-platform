"use client";

import { useTransition } from "react";

import { Loader2, ShoppingCart } from "lucide-react";

import { useAddToCartMutation } from "@/lib/store/services/cartApi";
import { cn } from "@/lib/utils";

import { CustomToast } from "../CustomToast";
import { Button } from "../ui/button";

interface AddToCartButtonProps {
  productId: string;
}

export const AddToCartButton = ({ productId }: AddToCartButtonProps) => {
  const [addToCart, { isLoading }] = useAddToCartMutation();

  const handleAddToCart = async () => {
    try {
      await addToCart({ product_id: productId, qty: 1 }).unwrap();
      CustomToast("success", "加入購物車成功");
    } catch (error) {
      console.error("加入購物車失敗:", error);
      CustomToast("warning", "加入失敗，請稍後再試。");
    }
  };
  return (
    <Button
      size="icon"
      className={cn(
        "bg-primary-100 hover:bg-primary-300 rounded-full",
        isLoading && "cursor-not-allowed opacity-70"
      )}
      title="加入購物車"
      onClick={handleAddToCart}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <ShoppingCart className="h-4 w-4" />
      )}
    </Button>
  );
};
