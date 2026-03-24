"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { useCart } from "@/hooks/useCart";
import { CirclePlus } from "lucide-react";

import { AddToCartFullButton } from "@/components/button/AddToCartFullButton";
import { QuantitySelector } from "@/components/ui/QuantitySelector";
import { Button } from "@/components/ui/button";

import { Product } from "@/types/product";

interface ProductActionSectionProps {
  product: Product;
}

export const ProductActionSection = ({
  product,
}: ProductActionSectionProps) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart, isLoading } = useCart();
  const router = useRouter();

  const handleBuyNow = async () => {
    await addToCart(product, quantity);
    router.push("/cart");
  };

  return (
    <div className="flex flex-col gap-4">
      {/* 數量選擇器 */}
      <QuantitySelector
        value={quantity}
        onChange={setQuantity}
        min={1}
        max={10}
      />

      {/* 操作按鈕 */}
      <div className="mt-4 flex flex-col gap-4 sm:flex-row">
        <Button
          variant="outline"
          className="w-full rounded-sm bg-gray-100 py-7 text-base font-bold shadow-none sm:flex-2"
          onClick={handleBuyNow}
          disabled={isLoading}
        >
          直接購買
          <CirclePlus className="ml-2 h-5 w-5" />
        </Button>
        <AddToCartFullButton
          product={product}
          quantity={quantity}
          className="w-full sm:flex-3"
        />
      </div>
    </div>
  );
};
