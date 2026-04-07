"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useCart } from "@/hooks/useCart";
import { MoveRight, ShoppingBag } from "lucide-react";

import { ActionFullButton } from "@/components/shared/ActionFullButton";
import { Button } from "@/components/ui/button";

import { useAppSelector } from "@/lib/store/hooks";

import Loading from "../loading";
import { CartCard } from "./_components/CartCard";
import { CartTable } from "./_components/CartTable";

export default function CartPage() {
  const { cartItems, isLoading, handleDelete, handleUpdate, hasHydrated } =
    useCart();

  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const router = useRouter();

  const handleCheckoutRedirect = () => {
    if (isAuthenticated) {
      router.push("/checkout");
    } else {
      router.push("/signin?redirect=/checkout");
    }
  };

  if (!hasHydrated || isLoading) return <Loading />;

  // 處理購物車為空的狀態
  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="container mx-auto flex min-h-screen flex-col items-center pt-[33vh] text-center">
        <div className="mb-6 rounded-full bg-gray-100 p-6 text-gray-400">
          <ShoppingBag className="h-16 w-16" />
        </div>
        <h2 className="mb-2 text-2xl font-bold">您的購物車目前是空的</h2>
        <p className="mb-8 text-gray-400">
          快去逛逛我們的農場，挑選新鮮商品吧！
        </p>
        <Link href="/products">
          <Button
            variant="default"
            className="px-8 py-6 text-lg font-bold text-white"
          >
            前往商品頁
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto min-h-screen p-3">
      <CartTable
        cartItems={cartItems}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
      <CartCard
        className="md:hidden"
        cartItems={cartItems}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
      <div className="flex justify-end py-5">
        <ActionFullButton
          className="h-13 md:w-1/3"
          onClick={handleCheckoutRedirect}
        >
          前往付款
          <MoveRight />
        </ActionFullButton>
      </div>
    </div>
  );
}
