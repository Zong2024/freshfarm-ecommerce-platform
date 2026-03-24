"use client";
import { useCart } from "@/hooks/useCart";
import { Loader2, ShoppingCart } from "lucide-react";

import { cn } from "@/lib/utils";

import { CartProduct } from "@/types/product";

import { Button } from "../ui/button";

interface AddToCartIconButtonProps {
  product: CartProduct;
}

export const AddToCartIconButton = ({ product }: AddToCartIconButtonProps) => {
  const { addToCart, isLoading } = useCart();
  const handleAddToCart = async (qty: number = 1) => {
    addToCart(product, qty);
  };
  return (
    <Button
      size="icon"
      className={cn(
        "bg-primary-100 hover:bg-primary-300 rounded-full",
        isLoading && "cursor-not-allowed opacity-70"
      )}
      title="加入購物車"
      onClick={() => handleAddToCart(1)}
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
