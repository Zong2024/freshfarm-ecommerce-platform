"use client";

import { useRouter } from "next/navigation";

import { CustomToast } from "@/components/shared/CustomToast";

import { logout } from "@/lib/store/features/auth/authSlice";
import { useAppDispatch } from "@/lib/store/hooks";
import { signOutWithSupabase } from "@/lib/supabase/auth";

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = async (onSuccess?: () => void) => {
    const useNestApi = process.env.NEXT_PUBLIC_USE_NEST_API === "true";

    dispatch(logout());

    if (useNestApi) {
      await signOutWithSupabase();
    }

    CustomToast("success", "您已成功登出");
    router.push("/");
    if (onSuccess) onSuccess();
  };

  return { handleLogout };
};
