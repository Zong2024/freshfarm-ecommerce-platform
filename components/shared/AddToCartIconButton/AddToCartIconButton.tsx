"use client";
import { useCart } from "@/hooks/useCart";
import { Loader2, ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import { AddToCartIconButtonProps } from "./AddToCartIconButton.types";

export const AddToCartIconButton = ({ product }: AddToCartIconButtonProps) => {
  const { addToCart, isLoading, hasHydrated } = useCart();
  const handleAddToCart = async (qty: number = 1) => {
    addToCart(product, qty);
  };
  const showLoading = hasHydrated ? isLoading : false;
  return (
    <Button
      size="icon"
      className={cn(
        "bg-primary-100 hover:bg-primary-300 rounded-full",
        showLoading && "cursor-not-allowed opacity-70"
      )}
      title="加入購物車"
      onClick={() => handleAddToCart(1)}
      disabled={showLoading}
    >
      {showLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <ShoppingCart className="h-4 w-4" />
      )}
    </Button>
  );
};
