"use client";

import { useMemo } from "react";

import Link from "next/link";

import { ShoppingCart } from "lucide-react";

import { useGetCartQuery } from "@/lib/store/services/cartApi";
import { cn } from "@/lib/utils";

export function CartBadge() {
  const { data: cartData, isLoading, isError } = useGetCartQuery();

  const totalQty = useMemo(() => {
    const carts = cartData?.data?.carts;
    if (!carts) return 0;
    return carts.reduce((acc, item) => acc + item.qty, 0);
  }, [cartData]);

  // 3. 判斷是否顯示 Badge
  const showBadge = !isLoading && !isError && totalQty > 0;

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
            totalQty > 9 ? "px-1.5" : "w-5"
          )}
        >
          {totalQty > 99 ? "99+" : totalQty}
        </span>
      )}
    </Link>
  );
}
