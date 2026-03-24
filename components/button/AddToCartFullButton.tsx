"use client";

import { useCart } from "@/hooks/useCart";
import { Loader2, ShoppingCart } from "lucide-react";

import { cn } from "@/lib/utils";

import { CartProduct } from "@/types/product";

import { Button } from "../ui/button";

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
    <Button
      className={cn(
        "rounded-sm py-7 font-bold text-white shadow-none",
        isLoading && "cursor-not-allowed opacity-70",
        className
      )}
      onClick={handleAddToCart}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
      ) : (
        <>
          加入購物車 <ShoppingCart className="ml-2 h-5 w-5" />
        </>
      )}
    </Button>
  );
};
