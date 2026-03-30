"use client";

import { useState } from "react";

import {
  ArrowUpDown,
  ExternalLink,
  Filter,
  MoreHorizontal,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data for products
const MOCK_PRODUCTS = [
  {
    id: "1",
    name: "有機紅富士蘋果",
    category: "水果",
    price: 150,
    unit: "斤",
    stock: 45,
    status: "active",
    image:
      "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: "2",
    name: "高山大白菜",
    category: "蔬菜",
    price: 60,
    unit: "顆",
    stock: 8,
    status: "active",
    image:
      "https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: "3",
    name: "特級初榨苦茶油",
    category: "加工品",
    price: 850,
    unit: "瓶",
    stock: 12,
    status: "inactive",
    image:
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=100&q=80",
  },
];

export default function FarmerProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">我的產品</h1>
          <p className="text-muted-foreground">
            管理您的農場產品、庫存與定價。
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> 新增產品
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">產品總數</CardTitle>
            <Package className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-muted-foreground text-xs">+2 件與上月相比</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">低庫存警示</CardTitle>
            <ArrowUpDown className="text-destructive h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-destructive text-2xl font-bold">3</div>
            <p className="text-muted-foreground text-xs">需盡快補貨</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <CardTitle>產品清單</CardTitle>
              <CardDescription>
                顯示您目前在商店中展示的所有產品。
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-full md:w-64">
                <Input
                  placeholder="搜尋產品名稱..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">圖片</TableHead>
                <TableHead>產品名稱</TableHead>
                <TableHead>分類</TableHead>
                <TableHead>價格 / 單位</TableHead>
                <TableHead>庫存</TableHead>
                <TableHead>狀態</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_PRODUCTS.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-10 w-10 rounded-md object-cover"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>
                    NT$ {product.price} / {product.unit}
                  </TableCell>
                  <TableCell>
                    <span
                      className={
                        product.stock < 10 ? "text-destructive font-bold" : ""
                      }
                    >
                      {product.stock}
                    </span>
                  </TableCell>
                  <TableCell>
                    {product.status === "active" ? (
                      <Badge variant="default" className="bg-primary-300">
                        上架中
                      </Badge>
                    ) : (
                      <Badge variant="secondary">已下架</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">操作選單</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>產品操作</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Pencil className="mr-2 h-4 w-4" /> 編輯資料
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <ExternalLink className="mr-2 h-4 w-4" /> 前往商店頁面
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" /> 刪除產品
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function Package(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16.5 9.4 7.5 4.21" />
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.29 7 12 12 20.71 7" />
      <line x1="12" y1="22" x2="12" y2="12" />
    </svg>
  );
}
