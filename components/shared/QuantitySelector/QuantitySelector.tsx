"use client";

import { useState } from "react";

import { Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import { QuantitySelectorProps } from "./QuantitySelector.types";

export const QuantitySelector = ({
  value,
  onChange,
  max = 10,
  min = 1,
  disabled = false,
}: QuantitySelectorProps) => {
  const [internalQuantity, setInternalQuantity] = useState(min);

  const isControlled = value !== undefined;
  const quantity = isControlled ? value : internalQuantity;

  const handleIncrement = () => {
    if (quantity < max) {
      const newValue = quantity + 1;
      if (!isControlled) setInternalQuantity(newValue);
      onChange?.(newValue);
    }
  };

  const handleDecrement = () => {
    if (quantity > min) {
      const newValue = quantity - 1;
      if (!isControlled) setInternalQuantity(newValue);
      onChange?.(newValue);
    }
  };

  return (
    <div className="mt-2 flex w-full items-center justify-between rounded-sm border">
      <Button
        variant="ghost"
        className="hover:bg-0 px-4 py-3 transition-colors"
        onClick={handleDecrement}
        disabled={disabled || quantity <= min}
        aria-label="減少數量"
      >
        <Minus className="h-4 w-4" />
      </Button>
      <div className="min-w-14 px-6 py-3 text-center" aria-live="polite">
        {quantity}
      </div>
      <Button
        variant="ghost"
        className="hover:bg-0 px-4 py-3 transition-colors"
        onClick={handleIncrement}
        disabled={disabled || quantity >= max}
        aria-label="增加數量"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
};
