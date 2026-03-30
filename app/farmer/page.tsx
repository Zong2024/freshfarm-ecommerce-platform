import { AlertCircle, Package, ShoppingCart, TrendingUp } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function FarmerDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">農場概覽</h1>
        <p className="text-muted-foreground">
          歡迎回來！這是您農場今日的營運概況。
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">總營收 (本月)</CardTitle>
            <TrendingUp className="text-primary-300 h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">NT$ 45,280</div>
            <p className="text-muted-foreground text-xs">+12.5% 與上月相比</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">待出貨訂單</CardTitle>
            <ShoppingCart className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-muted-foreground text-xs">需在 24 小時內處理</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">上架中產品</CardTitle>
            <Package className="text-primary h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-muted-foreground text-xs">佔總產品數的 85%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">系統通知</CardTitle>
            <AlertCircle className="text-danger h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-muted-foreground text-xs">有新的產品審核通過</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>近期訂單</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="bg-muted flex h-9 w-9 items-center justify-center rounded-full">
                    <ShoppingCart className="h-5 w-5" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm leading-none">訂單 #ORD-00{i}</p>
                    <p className="text-muted-foreground text-xs">
                      2 小時前 - 有機紅富士蘋果 x 2
                    </p>
                  </div>
                  <div className="text-primary-300 text-sm">NT$ 300</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>熱銷排行</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "有機紅富士蘋果", sales: 124 },
                { name: "高山大白菜", sales: 86 },
                { name: "特級初榨苦茶油", sales: 22 },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="text-muted-foreground w-4 text-lg font-bold">
                    {i + 1}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm leading-none">{item.name}</p>
                    <div className="bg-muted h-2 w-full overflow-hidden rounded-full">
                      <div
                        className="bg-primary-200 h-full"
                        style={{ width: `${(item.sales / 124) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-sm">{item.sales} 銷量</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
