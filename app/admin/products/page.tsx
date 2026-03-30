"use client";

import { useState } from "react";

import {
  CheckCircle,
  Eye,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  XCircle,
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

// Mock data for admin products review
const MOCK_ADMIN_PRODUCTS = [
  {
    id: "1",
    name: "有機紅富士蘋果",
    farmer: "阿明農場",
    category: "水果",
    price: 150,
    status: "approved",
    createdAt: "2024-03-20",
  },
  {
    id: "2",
    name: "高山大白菜",
    farmer: "玉山農夫",
    category: "蔬菜",
    price: 60,
    status: "pending",
    createdAt: "2024-03-25",
  },
  {
    id: "3",
    name: "特級初榨苦茶油",
    farmer: "油茶世家",
    category: "加工品",
    price: 850,
    status: "rejected",
    createdAt: "2024-03-18",
  },
];

export default function AdminProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">產品審核管理</h1>
          <p className="text-muted-foreground">
            審核農夫提交的新產品與維護現有清單。
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">待審核</CardTitle>
            <div className="h-2 w-2 rounded-full bg-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-muted-foreground text-xs">需在 48 小時內處理</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">本月新增產品</CardTitle>
            <Plus className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-muted-foreground text-xs">+5 與上月相比</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">檢舉/爭議產品</CardTitle>
            <XCircle className="text-destructive h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-muted-foreground text-xs">需立即介入調查</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <CardTitle>產品審核清單</CardTitle>
              <CardDescription>
                管理全平台產品的審核狀態與詳情。
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-full md:w-64">
                <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
                <Input
                  placeholder="搜尋產品名稱或農夫..."
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
                <TableHead>產品名稱</TableHead>
                <TableHead>提交農夫</TableHead>
                <TableHead>分類</TableHead>
                <TableHead>提交日期</TableHead>
                <TableHead>審核狀態</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_ADMIN_PRODUCTS.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.farmer}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.createdAt}</TableCell>
                  <TableCell>
                    {product.status === "approved" && (
                      <Badge variant="default" className="bg-green-600">
                        已通過
                      </Badge>
                    )}
                    {product.status === "pending" && (
                      <Badge
                        variant="secondary"
                        className="bg-orange-500 text-white hover:bg-orange-600"
                      >
                        待審核
                      </Badge>
                    )}
                    {product.status === "rejected" && (
                      <Badge variant="destructive">已拒絕</Badge>
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
                        <DropdownMenuLabel>審核操作</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" /> 查看詳情
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-green-600">
                          <CheckCircle className="mr-2 h-4 w-4" /> 批准上架
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <XCircle className="mr-2 h-4 w-4" /> 拒絕申請
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
