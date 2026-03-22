import Image from "next/image";

import { Trash2 } from "lucide-react";

import { CartItem } from "@/types/cart";

import { QuantitySelector } from "../ui/QuantitySelector";
import { Button } from "../ui/button";

interface CartTableProps {
  cartItems?: CartItem[];
  onUpdate: (id: string, product_id: string, qty: number) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export const CartTable = ({
  cartItems,
  onUpdate,
  onDelete,
}: CartTableProps) => {
  return (
    <div className="mx-auto my-15 max-w-324 rounded-lg bg-white px-9 shadow-sm">
      <table className="hidden w-full min-w-150 table-fixed md:table">
        <thead className="border-b">
          <tr className="">
            <th className="w-2/5 p-3 text-start font-bold">商品資訊</th>
            <th className="w-[15%] p-3 text-center font-bold">單價</th>
            <th className="w-[20%] p-3 text-center font-bold">數量</th>
            <th className="w-[15%] p-3 text-center font-bold">小計</th>
            <th className="hidden w-20 p-3 text-center font-bold">移除</th>
          </tr>
        </thead>
        <tbody>
          {cartItems?.map((item) => (
            <tr key={item.id} className="border-b last:border-0">
              <td className="py-6">
                <div className="flex items-center gap-4">
                  <div className="relative aspect-square h-20 w-20 overflow-hidden rounded-lg bg-gray-50">
                    <Image
                      src={item.product.imageUrl}
                      alt={item.product.title}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <span className="line-clamp-2 text-base font-bold text-gray-800">
                    {item.product.title}
                  </span>
                </div>
              </td>
              <td className="py-6 text-center text-gray-600">
                NT$ {item.product.price}
              </td>
              <td className="py-6">
                <div className="flex justify-center">
                  <QuantitySelector
                    value={item.qty}
                    onChange={(newQty) =>
                      onUpdate(item.id, item.product_id, newQty)
                    }
                  />
                </div>
              </td>
              <td className="text-primary-400 py-6 text-center font-bold">
                NT$ {item.total}
              </td>
              <td className="py-6 text-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:text-destructive text-gray-400"
                  aria-label="移除商品"
                  onClick={() => onDelete(item.id)}
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
