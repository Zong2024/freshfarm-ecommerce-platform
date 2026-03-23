"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { MoveRight, ShoppingBag } from "lucide-react";

import { CartCard } from "@/components/card/CartCard";
import { CartTable } from "@/components/table/CartTable";
import { Button } from "@/components/ui/button";

import { useAppSelector } from "@/lib/store/hooks";
import {
  useDeleteCartMutation,
  useGetCartQuery,
  useUpdateCartMutation,
} from "@/lib/store/services/cartApi";

import Loading from "../loading";

export default function CartPage() {
  const { data, isLoading } = useGetCartQuery();
  const [updateCart] = useUpdateCartMutation();
  const [deleteCart] = useDeleteCartMutation();

  const cartItems = data?.data.carts;

  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const router = useRouter();

  const handleUpdate = async (id: string, product_id: string, qty: number) => {
    try {
      await updateCart({ id, product_id, qty }).unwrap();
    } catch (error) {
      console.error("更新數量失敗", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCart(id).unwrap();
    } catch (error) {
      console.error("移除商品失敗", error);
    }
  };

  const handleCheckoutRedirect = () => {
    if (isAuthenticated) {
      router.push("/checkout");
    } else {
      router.push("/signin?redirect=/checkout");
    }
  };

  if (isLoading) return <Loading />;

  // 處理購物車為空的狀態
  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="container mx-auto flex min-h-screen flex-col items-center pt-[33vh] text-center">
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
        <Button
          variant="default"
          className="w-full text-white md:w-1/3"
          onClick={handleCheckoutRedirect}
        >
          前往付款
          <MoveRight />
        </Button>
      </div>
    </div>
  );
}
