import { ProductActionSection } from "@/components/product/ProductActionSection";
import { ProductGallery } from "@/components/product/ProductGallery";

import { getProduct } from "@/lib/services/product";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = await getProduct(id);

  return (
    <div className="container mx-auto max-w-5xl px-4 py-15">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
        {/* ================= 左側：商品圖片區 ================= */}
        <div className="flex flex-col gap-4 md:col-span-5">
          <ProductGallery
            mainImage={product.imageUrl}
            subImages={product.imagesUrl.slice(0, 3)}
            productTitle={product.title}
          />
        </div>

        {/* ================= 右側：商品資訊區 ================= */}
        <div className="flex flex-col gap-4 md:col-span-7">
          {/* 標題與基本資訊 */}
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl font-bold tracking-wide md:text-4xl">
              {product.title}
            </h1>
            <div className="mt-2 flex flex-col gap-2 text-sm text-gray-400 md:text-base">
              <p>產地：{product.origin || "台灣"}</p>
              <p>
                規格：{product.weight || "依實際出貨為主"} [
                {product.num
                  ? `${product.num}${product.unit}`
                  : "實際數量依重量為主"}
                ]
              </p>

              <div className="mt-1 flex items-center gap-2">
                <span>檢驗報告：</span>
                {/* 檢驗標章 Placeholder (模擬 TAP 與產銷履歷) */}
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1e9b4b] text-[10px] font-bold text-white shadow-sm">
                  TAP
                </div>
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#4ba34b] text-[10px] font-bold text-white shadow-sm">
                  履弱
                </div>
              </div>
            </div>
          </div>

          {/* 價格 */}
          <div className="mt-2 flex items-baseline gap-3">
            <span className="text-secondary-300 text-3xl font-bold">
              NT$ {product.price}
            </span>
            {product.price < product.origin_price && (
              <span className="text-lg text-gray-300 line-through">
                NT$ {product.origin_price}
              </span>
            )}
          </div>

          {/* 數量選擇器與操作按鈕 */}
          <ProductActionSection product={product} />

          {/* 運送/付款提示區塊 */}
          <div className="bg-secondary-50 mt-4 rounded-sm border-none px-6 py-4 leading-relaxed">
            <p>消費滿 NT $1,000，享有免運費優惠</p>
            <p>[付款] 貨到付款、ATM 轉帳</p>
            <p>[運送] 黑貓宅配、農場自取</p>
          </div>

          {/* 商品內容描述 */}
          <div className="mt-6 border-t pt-6">
            <h2 className="mb-4 text-xl font-bold">商品描述</h2>
            <div className="space-y-4 text-gray-400">{product.description}</div>
          </div>

          {product.content && (
            <div className="mt-6 border-t pt-6">
              <h2 className="mb-4 text-xl font-bold">詳細說明</h2>
              <div
                className="prose prose-sm max-w-none text-gray-400"
                dangerouslySetInnerHTML={{ __html: product.content }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
