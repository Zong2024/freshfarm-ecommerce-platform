"use client";

import Link from "next/link";

import { ShoppingBag } from "lucide-react";

import { CartCard } from "@/components/card/CartCard";
import { CartTable } from "@/components/table/CartTable";
import { Button } from "@/components/ui/button";

// import { useAppDispatch } from "@/lib/store/hooks";
import { useGetCartQuery } from "@/lib/store/services/cartApi";

import Loading from "../loading";

export default function CartPage() {
  // const dispatch = useAppDispatch();
  const { data, isLoading } = useGetCartQuery();
  const cartItems = data?.data.carts;

  if (isLoading) {
    return <Loading />;
  }

  // 處理購物車為空的狀態
  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="container mx-auto flex min-h-[50vh] flex-col items-center justify-center p-3 text-center">
        <div className="mb-6 rounded-full bg-gray-100 p-6 text-gray-400">
          <ShoppingBag className="h-16 w-16" />
        </div>
        <h2 className="mb-2 text-2xl font-bold text-gray-800">
          您的購物車目前是空的
        </h2>
        <p className="mb-8 text-gray-500">
          快去逛逛我們的農場，挑選新鮮商品吧！
        </p>
        <Link href="/products">
          <Button className="px-8 py-6 text-lg font-bold text-white">
            前往商品頁
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-3">
      <CartTable cartItems={cartItems} />
      <CartCard className="md:hidden" cartItems={cartItems} />
      <div className="flex justify-end py-5">
        <Button variant="default" className="w-full text-white md:w-1/3">
          前往付款
        </Button>
      </div>
    </div>
  );
}
