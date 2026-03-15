"use client";

import { useState } from "react";

import { Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

export const QuantitySelector = () => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    if (quantity < 10) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <>
      <div className="mt-2 flex w-full items-center justify-between rounded-sm border">
        <Button
          variant="ghost"
          className="hover:bg-0 px-4 py-3 transition-colors"
          onClick={handleDecrement}
          disabled={quantity <= 1}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <div className="min-w-[3.5rem] px-6 py-3 text-center">{quantity}</div>
        <Button
          variant="ghost"
          className="hover:bg-0 px-4 py-3 transition-colors"
          onClick={handleIncrement}
          disabled={quantity >= 10}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
};
