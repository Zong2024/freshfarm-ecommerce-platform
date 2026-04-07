"use client";

import Link from "next/link";

import { useCart } from "@/hooks/useCart";
import { ShoppingCart } from "lucide-react";

import { cn } from "@/lib/utils";

import { CartBadgeProps } from "./CartBadge.types";

export const CartBadge = ({ className }: CartBadgeProps) => {
  const { cartTotalQty, isLoading, isError, hasHydrated } = useCart();

  if (!hasHydrated) {
    return (
      <div className={cn("relative inline-flex items-center p-2", className)}>
        <ShoppingCart className="text-foreground/50 h-6 w-6" />
      </div>
    );
  }

  const showBadge = !isLoading && !isError && cartTotalQty > 0;

  return (
    <Link
      href="/cart"
      className={cn(
        "hover:text-primary relative inline-flex items-center p-2 transition-colors",
        className
      )}
      aria-label="查看購物車"
    >
      <ShoppingCart className="h-6 w-6" />

      {showBadge && (
        <span
          className={cn(
            "bg-danger text-destructive-foreground animate-in fade-in zoom-in absolute -top-0.5 -right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px] font-bold duration-300",
            cartTotalQty > 9 ? "px-1.5" : "w-5"
          )}
        >
          {cartTotalQty > 99 ? "99+" : cartTotalQty}
        </span>
      )}
    </Link>
  );
};
