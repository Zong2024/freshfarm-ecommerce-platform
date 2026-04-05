"use client";

import { Suspense } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { useCart } from "@/hooks/useCart";
import { zodResolver } from "@hookform/resolvers/zod";
import { Facebook, Leaf, Loader2, Lock, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { CustomToast } from "@/components/common/CustomToast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { setCredentials } from "@/lib/store/features/auth/authSlice";
import { useAppDispatch } from "@/lib/store/hooks";
import { useLoginMutation } from "@/lib/store/services/authApi";

const formSchema = z.object({
  username: z.string().email({ message: "請輸入有效的電子郵件地址" }),
  password: z.string().min(6, {
    message: "密碼至少需要 6 個字元",
  }),
});

function SignInForm() {
  const { mergeCart } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/";
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await login(values).unwrap();
      dispatch(
        setCredentials({
          uid: response.uid,
          token: response.token,
          expired: response.expired,
          message: response.message,
          status: response.status,
        })
      );
      await mergeCart();
      CustomToast("success", "登入成功！歡迎回來");
      router.push(redirectUrl);
    } catch (error) {
      console.log(error);
      CustomToast("warning", "登入失敗，請檢查您的帳號密碼");
    }
  }

  return (
    <div className="grid gap-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-400">電子郵件</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-300" />
                    <Input
                      placeholder="name@example.com"
                      className="pl-10"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel className="text-gray-400">密碼</FormLabel>
                  <Link
                    href="/forgot-password"
                    className="text-primary-400 hover:text-primary-300 text-sm font-medium transition-colors"
                  >
                    忘記密碼？
                  </Link>
                </div>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-300" />
                    <Input
                      type="password"
                      placeholder="••••••••"
                      className="pl-10"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full py-6 text-lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              "登入帳號"
            )}
          </Button>
        </form>
      </Form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-100" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-gray-300">
            或者透過以下方式繼續
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          className="h-12 border-gray-100"
          type="button"
        >
          <Facebook className="mr-2 h-5 w-5" />
          Facebook
        </Button>
        <Button
          variant="outline"
          className="h-12 border-gray-100"
          type="button"
        >
          <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Google
        </Button>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <div className="bg-background flex min-h-screen w-full overflow-hidden">
      {/* 左側：品牌展示區 (僅在桌面版顯示) */}
      <div className="relative hidden w-1/2 flex-col items-center justify-center p-12 lg:flex">
        <div className="absolute inset-0 z-0">
          <Image
            src="/image/hero-bg.jpg"
            alt="FreshFarm Background"
            fill
            className="object-cover brightness-50"
            priority
          />
          <div className="bg-primary-400/20 absolute inset-0 mix-blend-multiply" />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="mb-6 flex items-center gap-2 rounded-full bg-white/20 p-3 backdrop-blur-md">
            <Leaf className="text-primary-100 h-8 w-8" />
          </div>
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            FreshFarm
          </h1>
          <p className="text-primary-50 max-w-md text-lg">
            從產地到餐桌的直線距離，把最鮮活的農產品，直接送到您的家中。
          </p>
        </div>

        <div className="absolute bottom-12 left-12 z-10 text-white/60">
          © 2026 FreshFarm Inc. All rights reserved.
        </div>
      </div>

      {/* 右側：表單操作區 */}
      <div className="flex w-full flex-col items-center justify-center p-6 sm:p-12 lg:w-1/2">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <div className="mb-4 flex justify-center lg:hidden lg:justify-start">
              <div className="bg-primary-50 text-primary-400 flex items-center gap-2 rounded-xl p-2">
                <Leaf className="h-6 w-6" />
                <span className="text-xl font-bold">FreshFarm</span>
              </div>
            </div>
            <h2 className="text-accent text-3xl font-bold tracking-tight">
              歡迎回來
            </h2>
            <p className="mt-2 text-gray-400">
              請輸入您的電子郵件與密碼以登入帳號
            </p>
          </div>

          <Suspense
            fallback={
              <div className="flex h-32 items-center justify-center">
                <Loader2 className="text-primary-400 h-8 w-8 animate-spin" />
              </div>
            }
          >
            <SignInForm />
          </Suspense>

          <p className="text-center text-sm text-gray-400">
            沒有帳號嗎？{" "}
            <Link
              href="/signup"
              className="text-primary-400 hover:text-primary-300 font-semibold transition-colors"
            >
              免費註冊
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
