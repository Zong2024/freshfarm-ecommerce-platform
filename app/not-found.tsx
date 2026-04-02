"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Trees } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  const [count, setCount] = useState(5);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    if (count <= 0) {
      router.push("/");
    }

    return () => clearInterval(timer);
  }, [count, router]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-20 text-center">
      <div className="bg-primary-50 mb-6 flex h-24 w-24 items-center justify-center rounded-full">
        <Trees className="text-primary-400 h-12 w-12" />
      </div>

      <h1 className="mb-2 text-6xl font-black text-gray-200">404</h1>
      <h2 className="text-primary-400 mb-4 text-3xl font-bold">農場迷路了</h2>

      <p className="max-w-md text-gray-500">
        糟糕！您尋找的頁面似乎已經被收割或是還沒播種。
        請確認網址是否正確，或是點擊下方按鈕回到首頁。
      </p>

      <p className="text-primary-400 mt-4 mb-8 text-sm font-medium">
        將在 {count} 秒後自動返回首頁...
      </p>

      <div className="flex flex-col gap-4 sm:flex-row">
        <Button asChild size="lg" className="font-bold">
          <Link href="/">立即回到首頁</Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="font-bold">
          <Link href="/products">去逛逛商品</Link>
        </Button>
      </div>
    </div>
  );
}
