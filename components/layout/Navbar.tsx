"use client";

import { useState } from "react";

import Link from "next/link";

import { useHasHydrated } from "@/hooks/useHasHydrated";
import { useLogout } from "@/hooks/useLogout";
import { LogOut, Menu, User } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { useAppSelector } from "@/lib/store/hooks";
import { cn } from "@/lib/utils";

import { CartBadge } from "../shared/CartBadge";
import { Button } from "../ui/button";

// --- Constants ---
const PUBLIC_ITEMS = [
  { label: "首頁", href: "/" },
  { label: "產品介紹", href: "/products" },
];

const AUTH_ITEMS = [
  { label: "我的訂單", href: "/user/orders" },
  { label: "會員中心", href: "/user" },
];

// --- Sub-components ---

const NavLink = ({
  href,
  label,
  className,
  onClick,
}: {
  href: string;
  label: string;
  className?: string;
  onClick?: () => void;
}) => (
  <Link
    href={href}
    onClick={onClick}
    className={cn("hover:text-primary-300 transition-colors", className)}
  >
    {label}
  </Link>
);

const DesktopNav = ({
  isLoggedIn,
  isInitialized,
  hasHydrated,
}: {
  isLoggedIn: boolean;
  isInitialized: boolean;
  hasHydrated: boolean;
}) => (
  <nav className="hidden items-center gap-6 md:flex">
    {PUBLIC_ITEMS.map((item) => (
      <NavLink
        key={item.href}
        href={item.href}
        label={item.label}
        className="py-2 text-[24px] font-bold"
      />
    ))}
    <div className="relative">
      <CartBadge />
    </div>
    <AuthSection
      isLoggedIn={isLoggedIn}
      isInitialized={isInitialized}
      hasHydrated={hasHydrated}
    />
  </nav>
);

const AuthSection = ({
  isLoggedIn,
  isInitialized,
  hasHydrated,
}: {
  isLoggedIn: boolean;
  isInitialized: boolean;
  hasHydrated: boolean;
}) => {
  if (!hasHydrated || !isInitialized) return <div className="h-10 w-10" />;

  if (isLoggedIn) {
    return (
      <div className="flex items-center gap-6 p-2 text-[24px] font-bold">
        <Link href="/user">
          <User className="h-6 w-6 font-bold" />
        </Link>
      </div>
    );
  }

  return (
    <Link href="/signin">
      <Button variant="outline" className="rounded-full px-6 font-bold">
        登入
      </Button>
    </Link>
  );
};

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const hasHydrated = useHasHydrated();
  const { handleLogout } = useLogout();
  const { isAuthenticated: isLoggedIn, isInitialized } = useAppSelector(
    (state) => state.auth
  );

  return (
    <header className="bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="text-primary-400 container mx-auto flex items-center justify-between px-6 py-4 md:py-7 lg:px-0">
        <Link href="/" className="text-xl font-bold">
          LOGO
        </Link>

        {/* 桌面版 */}
        <DesktopNav
          isLoggedIn={isLoggedIn}
          isInitialized={isInitialized}
          hasHydrated={hasHydrated}
        />

        {/* 行動版 */}
        <div className="flex items-center gap-4 md:hidden">
          <CartBadge />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="default"
                size="icon"
                className="bg-gray-100 hover:bg-transparent"
              >
                <Menu className="h-6 w-6 text-black" />
                <span className="sr-only">切換選單</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-75 p-6 sm:w-100">
              <SheetTitle className="text-left">選單</SheetTitle>
              <nav className="mt-8 flex flex-col gap-4">
                {PUBLIC_ITEMS.map((item) => (
                  <NavLink
                    key={item.href}
                    href={item.href}
                    label={item.label}
                    className="text-lg font-medium"
                    onClick={() => setIsOpen(false)}
                  />
                ))}

                {hasHydrated && isInitialized && (
                  <>
                    {isLoggedIn ? (
                      <>
                        {AUTH_ITEMS.map((item) => (
                          <NavLink
                            key={item.href}
                            href={item.href}
                            label={item.label}
                            className="text-lg font-medium"
                            onClick={() => setIsOpen(false)}
                          />
                        ))}
                        <Button
                          variant="destructive"
                          onClick={() => handleLogout(() => setIsOpen(false))}
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
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
