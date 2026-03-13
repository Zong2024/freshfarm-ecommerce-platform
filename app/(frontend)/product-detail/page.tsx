import { Minus, Plus, ShoppingCart } from "lucide-react";

import { ProductGallery } from "@/components/product/ProductGallery";
import { Button } from "@/components/ui/button";

export default function ProductDetailPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-15">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
        {/* ================= 左側：商品圖片區 ================= */}
        <div className="flex flex-col gap-4 md:col-span-5">
          <ProductGallery />
        </div>

        {/* ================= 右側：商品資訊區 ================= */}
        <div className="flex flex-col gap-4 md:col-span-7">
          {/* 標題與基本資訊 */}
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl font-bold tracking-wide text-[#5c4a45] md:text-4xl">
              麻豆大白柚
            </h1>
            <div className="mt-2 flex flex-col gap-2 text-sm text-[#786965] md:text-base">
              <p>產地：台南麻豆</p>
              <p>規格：6公斤裝 [4-6顆]</p>

              <div className="mt-1 flex items-center gap-2">
                <span>檢驗報告：</span>
                {/* 檢驗標章 Placeholder (模擬 TAP 與產銷履歷) */}
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1e9b4b] text-[10px] font-bold text-white shadow-sm">
                  TAP
                </div>
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#4ba34b] text-[10px] font-bold text-white shadow-sm">
                  履歷
                </div>
              </div>
            </div>
          </div>

          {/* 價格 */}
          <div className="mt-2 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-[#d2a356]">NT$ 950</span>
            <span className="text-lg text-gray-400 line-through">NT$ 760</span>
          </div>

          {/* 數量選擇器 (純 UI，保留給您後續實作狀態邏輯) */}
          <div className="mt-2 flex w-full items-center justify-between rounded-sm border">
            <button className="px-4 py-3 transition-colors hover:text-[#5c4a45]">
              <Minus className="h-4 w-4" />
            </button>
            <div className="min-w-[3.5rem] px-6 py-3 text-center font-medium text-[#5c4a45]">
              1
            </div>
            <button className="px-4 py-3 text-[#786965] transition-colors hover:text-[#5c4a45]">
              <Plus className="h-4 w-4" />
            </button>
          </div>

          {/* 操作按鈕 */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button
              variant="outline"
              className="w-full rounded-sm bg-gray-100 py-7 text-base font-bold shadow-none sm:flex-[2]"
            >
              直接購買
            </Button>
            <Button className="rounded-sm py-7 font-bold text-white shadow-none sm:flex-[3]">
              加入購物車 <ShoppingCart className="h-5 w-5" />
            </Button>
          </div>

          {/* 運送/付款提示區塊 */}
          <div className="bg-secondary-50 mt-4 rounded-sm border-none px-6 py-4 leading-relaxed">
            <p>消費滿 NT $1,000，享有免運費優惠</p>
            <p>[付款] 貨到付款、ATM 轉帳</p>
            <p>[運送] 黑貓宅配、農場自取</p>
          </div>
        </div>
      </div>
    </div>
  );
}
