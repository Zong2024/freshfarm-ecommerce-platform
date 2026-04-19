"use client";

import { Check, Lightbulb, X } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";

import { CustomToastProps, ToastType } from "./CustomToast.types";

export const ToastContent = ({ type, message, toastId }: CustomToastProps) => {
  return (
    <div
      className={cn(
        "flex w-full max-w-87.5 items-center rounded-xl border px-2 py-3",
        type === "success"
          ? "border-primary-300 bg-primary-50"
          : "border-secondary-300 bg-secondary-50"
      )}
    >
      {/* 左側圓形圖示 */}
      <div
        className={cn(
          "mr-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
          type === "success" ? "bg-primary-300" : "bg-secondary-300"
        )}
      >
        {type === "success" ? (
          <Check className="h-6 w-6 text-white" />
        ) : (
          <Lightbulb className="h-6 w-6 text-white" />
        )}
      </div>

      {/* 中間文字 */}
      <p className="flex-1 text-[1.1rem] font-bold">{message}</p>

      {/* 右側關閉按鈕 */}
      <button
        onClick={() => toast.dismiss(toastId)}
        className="ml-6 text-center text-gray-300 transition-colors hover:text-black"
        aria-label="關閉提示"
      >
        <X className="h-6 w-6" />
      </button>
    </div>
  );
};

export const CustomToast = (type: ToastType, message: string) =>
  toast.custom(
    (t) => <ToastContent type={type} message={message} toastId={t} />,
    {
      duration: 3000,
    }
  );
