"use client";

import { MoveRight } from "lucide-react";

import { ActionFullButton } from "@/components/shared/ActionFullButton";

interface CheckoutPayProps {
  itemsTotal: number;
  shippingFee: number;
  finalTotal: number;
  isLoading?: boolean;
}

export const CheckoutPay = ({
  itemsTotal,
  shippingFee,
  finalTotal,
  isLoading,
}: CheckoutPayProps) => {
  return (
    <section className="flex flex-col gap-4 rounded-lg bg-gray-50 p-6">
      <h4 className="text-primary-400 text-2xl font-bold">付款金額</h4>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <p>商品金額</p>
          <p className="font-bold">NT$ {itemsTotal}</p>
        </div>
        <div className="flex justify-between">
          <p>運費</p>
          <p className="font-bold">
            {shippingFee === 0 ? "免運" : `NT$ ${shippingFee}`}
          </p>
        </div>
      </div>

      <div className="border-t border-gray-300" />

      <div className="flex items-center justify-between">
        <p>總金額</p>
        <p className="text-secondary-300 text-3xl font-bold">
          NT$ {finalTotal}
        </p>
      </div>
      <ActionFullButton className="h-13" type="submit" disabled={isLoading}>
        前往付款
        <MoveRight />
      </ActionFullButton>
    </section>
  );
};
