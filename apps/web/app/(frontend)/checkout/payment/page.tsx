"use client";

import { Suspense, useEffect, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import {
  ArrowRight,
  CheckCircle2,
  Landmark,
  Loader2,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type PaymentStep = "idle" | "processing" | "success";

function PaymentContent() {
  const [step, setStep] = useState<PaymentStep>("idle");
  const [countdown, setCountdown] = useState(3);
  const searchParams = useSearchParams();
  const router = useRouter();
  const total = searchParams.get("total") || "0";

  const handlePayment = () => {
    setStep("processing");
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === "processing") {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setStep("success");
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step]);

  useEffect(() => {
    if (step === "success") {
      const redirectTimer = setTimeout(() => {
        router.push("/");
      }, 3000);
      return () => clearTimeout(redirectTimer);
    }
  }, [step, router]);

  return (
    <Card className="border-primary-100 w-full max-w-md shadow-xl">
      <CardHeader className="text-center">
        <CardTitle className="text-primary-400 text-2xl font-bold">
          {step === "idle" && "確認匯款資訊"}
          {step === "processing" && "匯款驗證中"}
          {step === "success" && "付款成功"}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6 py-6">
        {step === "idle" && (
          <>
            <div className="bg-primary-50 flex h-20 w-20 items-center justify-center rounded-full">
              <Landmark className="text-primary-400 h-10 w-10" />
            </div>
            <div className="w-full space-y-3 rounded-lg bg-gray-50 p-4">
              <div className="flex justify-between text-sm text-gray-500">
                <span>應付總額</span>
                <span className="text-secondary-300 text-lg font-bold">
                  NT$ {total}
                </span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>付款方式</span>
                <span>銀行轉帳 / 匯款</span>
              </div>
            </div>
            <p className="text-center text-sm text-gray-400">
              請確認金額無誤後，點擊下方按鈕開始模擬匯款程序。
            </p>
          </>
        )}

        {step === "processing" && (
          <>
            <div className="relative flex h-24 w-24 items-center justify-center">
              <Loader2 className="text-primary-400 h-16 w-16 animate-spin" />
              <span className="text-primary-400 absolute text-xl font-bold">
                {countdown}s
              </span>
            </div>
            <div className="space-y-2 text-center">
              <p className="text-lg font-medium text-gray-600">
                正在聯繫銀行進行匯款核對...
              </p>
              <p className="text-sm text-gray-400">請勿關閉或重新整理此頁面</p>
            </div>
          </>
        )}

        {step === "success" && (
          <>
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-50">
              <CheckCircle2 className="h-16 w-16 text-green-500" />
            </div>
            <div className="space-y-2 text-center">
              <h3 className="text-xl font-bold text-gray-800">
                感謝您的購買！
              </h3>
              <p className="text-gray-500">
                您的訂單已付款成功，正在為您安排出貨。
              </p>
              <div className="text-primary-400 flex items-center justify-center gap-2 pt-4 text-sm">
                <ShieldCheck className="h-4 w-4" />
                <span>交易安全已驗證</span>
              </div>
            </div>
          </>
        )}
      </CardContent>
      <CardFooter className="flex flex-col gap-3">
        {step === "idle" && (
          <Button className="h-12 w-full gap-2 text-lg" onClick={handlePayment}>
            確認匯款 <ArrowRight className="h-5 w-5" />
          </Button>
        )}
        {step === "success" && (
          <p className="text-sm text-gray-400">將在 3 秒後自動返回首頁...</p>
        )}
      </CardFooter>
    </Card>
  );
}

export default function PaymentPage() {
  return (
    <div className="container mx-auto flex min-h-[70vh] items-center justify-center px-4 py-12">
      <Suspense
        fallback={<Loader2 className="text-primary-400 h-8 w-8 animate-spin" />}
      >
        <PaymentContent />
      </Suspense>
    </div>
  );
}
