"use client";

import Link from "next/link";

import { useCart } from "@/hooks/useCart";
import { ShoppingCart } from "lucide-react";

import { cn } from "@/lib/utils";

export function CartBadge() {
  const { cartTotalQty, isLoading, isError, isMounted } = useCart();

  // 3. 判斷是否顯示 Badge
  if (!isMounted) return null;
  const showBadge = !isLoading && !isError && cartTotalQty > 0;

  return (
    <Link
      href="/cart"
      className="hover:text-primary relative inline-flex items-center p-2 transition-colors"
      aria-label="View Shopping Cart"
    >
      <ShoppingCart className="h-6 w-6" />

      {showBadge && (
        <span
          className={cn(
            "bg-destructive text-destructive-foreground animate-in fade-in zoom-in absolute -top-0.5 -right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px] font-bold duration-300",
            cartTotalQty > 9 ? "px-1.5" : "w-5"
          )}
        >
          {cartTotalQty > 99 ? "99+" : cartTotalQty}
        </span>
      )}
    </Link>
  );
}
