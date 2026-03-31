import Image from "next/image";

import { Trash2 } from "lucide-react";

import { cn } from "@/lib/utils";

import { CartItem } from "@/types/cart";

import { QuantitySelector } from "../QuantitySelector";
import { Button } from "../ui/button";

interface CartCardProps {
  cartItems?: CartItem[];
  className?: string;
  onUpdate: (id: string, product_id: string, qty: number) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export const CartCard = ({
  cartItems,
  className,
  onUpdate,
  onDelete,
}: CartCardProps) => {
  if (!cartItems || cartItems.length === 0) {
    return (
      <div className={cn("p-8 text-center text-gray-400", className)}>
        購物車目前無商品
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {cartItems.map((item) => (
        <article
          key={item.id}
          className="rounded-lg bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="flex items-start justify-between gap-3">
            {/* 商品圖片 */}
            <div className="relative aspect-square h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-50">
              <Image
                src={item.product.imageUrl}
                alt={item.product.title}
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>

            {/* 商品資訊 */}
            <div className="flex flex-1 flex-col gap-1">
              <h3 className="line-clamp-2 text-base font-bold text-gray-800">
                {item.product.title}
              </h3>
              <div className="flex text-sm text-gray-500">
                <p className="me-3">單價</p>
                <p>NT$ {item.product.price}</p>
              </div>
              <div className="flex text-sm">
                <p className="me-3 font-medium text-gray-600">小計</p>
                <p className="text-primary-400 font-bold">NT$ {item.total}</p>
              </div>
            </div>

            {/* 移除按鈕 */}
            <div className="shrink-0">
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-destructive text-danger -me-2 -mt-1 h-8 w-8"
                aria-label="移除商品"
                onClick={() => onDelete(item.id)}
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* 數量選擇器 */}
          <div className="mt-4 border-t pt-3">
            <QuantitySelector
              value={item.qty}
              onChange={(newQty) => onUpdate(item.id, item.product_id, newQty)}
            />
          </div>
        </article>
      ))}
    </div>
  );
};
