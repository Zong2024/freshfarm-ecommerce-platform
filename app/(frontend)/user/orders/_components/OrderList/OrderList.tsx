import Link from "next/link";

import { format } from "date-fns";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { OrderListProps } from "./OrderList.types";

export const OrderList = ({ orders }: OrderListProps) => {
  if (!orders || orders.length === 0) {
    return (
      <div className="flex min-h-60 flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 p-12 text-gray-500">
        <p className="mb-4">尚無訂單紀錄</p>
        <Button asChild variant="outline">
          <Link href="/products">前往購物</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* 桌機 */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 font-bold hover:bg-gray-50">
              <TableHead className="w-50 font-bold">訂單編號</TableHead>
              <TableHead className="font-bold">訂購日期</TableHead>
              <TableHead className="font-bold">付款狀態</TableHead>
              <TableHead className="font-bold">訂單總額</TableHead>
              <TableHead className="text-right font-bold">詳細內容</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow
                key={order.id}
                className="transition-colors hover:bg-gray-50"
              >
                <TableCell className="">#{order.id}</TableCell>
                <TableCell className="text-gray-400">
                  {format(order.create_at * 1000, "yyyy/MM/dd")}
                </TableCell>
                <TableCell>
                  {order.is_paid ? (
                    <Badge className="bg-primary-100 text-primary-400 hover:bg-primary-100 border-none font-bold">
                      已付款
                    </Badge>
                  ) : (
                    <Badge
                      variant="secondary"
                      className="border-none bg-gray-100 font-bold text-gray-400 hover:bg-gray-100"
                    >
                      未付款
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="font-bold">
                  NT$ {order.total.toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    asChild
                    variant="ghost"
                    className="text-primary-400 hover:text-primary-400 p-0 font-bold hover:bg-transparent hover:underline"
                  >
                    <Link href={`/order/${order.id}`}>查看詳情</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* 手機 */}
      <div className="flex flex-col gap-4 md:hidden">
        {orders.map((order) => (
          <div
            key={order.id}
            className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
          >
            <div className="mb-3 flex items-center justify-between border-b border-gray-100 pb-3">
              <span className="font-bold">#{order.id}</span>
              {order.is_paid ? (
                <Badge className="bg-primary-100 text-primary-400 hover:bg-primary-100 border-none font-bold">
                  已付款
                </Badge>
              ) : (
                <Badge
                  variant="secondary"
                  className="border-none bg-gray-100 font-bold text-gray-400 hover:bg-gray-100"
                >
                  未付款
                </Badge>
              )}
            </div>
            <div className="mb-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">訂購日期</span>
                <span className="">
                  {format(order.create_at * 1000, "yyyy/MM/dd")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">訂單總額</span>
                <span className="font-bold">
                  NT$ {order.total.toLocaleString()}
                </span>
              </div>
            </div>
            <Button asChild className="w-full font-bold">
              <Link href={`/order/${order.id}`}>查看詳情</Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
