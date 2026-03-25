"use client";

import Image from "next/image";

import { useCart } from "@/hooks/useCart";
import { ShoppingCart } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const CheckoutCartAccordion = () => {
  const { cartItems, cartTotalQty } = useCart();

  return (
    <div className="mb-6">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="cart-items" className="border-none">
          <AccordionTrigger className="rounded-lg bg-gray-50 px-6 py-4 transition-colors hover:bg-gray-100">
            <div className="flex items-center gap-2">
              <ShoppingCart className="text-primary-400 h-5 w-5" />
              <span className="text-lg font-bold">
                購物車清單 (共 {cartTotalQty} 件商品)
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="rounded-b-lg border-x border-b bg-white p-0">
            <div className="flex flex-col">
              {cartItems?.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 border-b p-4 last:border-none"
                >
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md">
                    <Image
                      src={item.product.imageUrl}
                      alt={item.product.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <p className="line-clamp-1 font-medium">
                      {item.product.title}
                    </p>
                    <p className="text-sm text-gray-500">數量: {item.qty}</p>
                  </div>
                  <p className="text-primary-400 font-bold">NT$ {item.total}</p>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
