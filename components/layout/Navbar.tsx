"use client";

import { useState } from "react";

import Link from "next/link";

import { LogOut, Menu, ShoppingCart, User } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { logout } from "@/lib/store/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

import { Button } from "../ui/button";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  //TODO: 先用假狀態模擬登入，之後加入登入邏輯
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.auth.isAuthenticated);

  const PUBLIC_ITEMS = [
    { label: "首頁", href: "/" },
    { label: "產品介紹", href: "/products" },
  ];

  const AUTH_ITEMS = [
    { label: "我的訂單", href: "/orders" },
    { label: "會員中心", href: "/profile" },
  ];

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="text-primary-400 container mx-auto flex items-center justify-between px-9 py-7">
        {/* Logo 區域 */}
        <Link href="/" className="text-xl font-bold">
          LOGO
        </Link>

        {/* 桌面版選單 (md 以上顯示) */}
        <nav className="hidden items-center gap-6 md:flex">
          {PUBLIC_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-primary-300 py-2 transition-colors"
            >
              <span className="text-[24px] font-bold">{item.label}</span>
            </Link>
          ))}
          {isLoggedIn ? (
            <div className="flex items-center gap-6 text-[24px] font-bold">
              <Link href="/orders">
                <User className="font-bold"></User>
              </Link>
              <Link href="/cart" className="relative">
                <ShoppingCart className="h-6 w-6" />
              </Link>
            </div>
          ) : (
            <Link href="/signin">
              <Button variant="outline" className="rounded-full px-6 font-bold">
                登入
              </Button>
            </Link>
          )}
        </nav>

        {/* 行動版選單 (md 以下顯示) */}
        <div className="flex items-center gap-4 md:hidden">
          <Link href="/cart">
            <ShoppingCart className="h-6 w-6" />
          </Link>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="default"
                size="icon"
                className="bg-gray-100 hover:bg-transparent"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">切換選單</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-300px sm:w-400px p-6">
              <SheetTitle className="text-left"></SheetTitle>
              <nav className="mt-8 flex flex-col gap-4">
                {PUBLIC_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="hover:text-primary text-lg font-medium transition-colors"
                    onClick={() => setIsOpen(false)} // 點擊連結後自動關閉 Sheet
                  >
                    {item.label}
                  </Link>
                ))}

                {isLoggedIn ? (
                  <>
                    {AUTH_ITEMS.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="text-lg font-medium"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                    <Button
                      variant="destructive"
                      onClick={handleLogout}
                      className="mt-4 w-full"
                    >
                      <LogOut className="mr-2 h-4 w-4" /> 登出
                    </Button>
                  </>
                ) : (
                  <Link href="/signin" onClick={() => setIsOpen(false)}>
                    <Button className="w-full text-lg">登入 / 註冊</Button>
                  </Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
