"use client";

import { useRouter } from "next/navigation";

import { CustomToast } from "@/components/shared/CustomToast";

import { logout } from "@/lib/store/features/auth/authSlice";
import { useAppDispatch } from "@/lib/store/hooks";

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = (onSuccess?: () => void) => {
    dispatch(logout());
    CustomToast("success", "您已成功登出");
    router.push("/"); // 登出後導向首頁
    if (onSuccess) onSuccess(); // 執行回調，如關閉選單
  };

  return { handleLogout };
};
