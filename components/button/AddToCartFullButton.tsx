"use client";

import { useCart } from "@/hooks/useCart";
import { ShoppingCart } from "lucide-react";

import { CartProduct } from "@/types/product";

import { ActionFullButton } from "./ActionFullButton";

interface AddToCartFullButtonProps {
  product: CartProduct;
  quantity?: number;
  className?: string;
}

export const AddToCartFullButton = ({
  product,
  quantity = 1,
  className,
}: AddToCartFullButtonProps) => {
  const { addToCart, isLoading } = useCart();

  const handleAddToCart = async () => {
    addToCart(product, quantity);
  };

  return (
    <ActionFullButton
      className={className}
      onClick={handleAddToCart}
      isLoading={isLoading}
    >
      加入購物車 <ShoppingCart className="ml-2 h-5 w-5" />
    </ActionFullButton>
  );
};
