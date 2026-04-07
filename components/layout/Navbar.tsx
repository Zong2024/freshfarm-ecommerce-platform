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
    className={cn(
      "group hover:text-primary relative py-2 text-base font-semibold tracking-tight text-gray-400 transition-colors",
      className
    )}
  >
    {label}
    <span className="bg-primary absolute -bottom-0.5 left-1/2 h-0.5 w-0 -translate-x-1/2 transition-all duration-300 group-hover:w-full" />
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
  <nav className="hidden items-center gap-8 md:flex">
    {PUBLIC_ITEMS.map((item) => (
      <NavLink key={item.href} href={item.href} label={item.label} />
    ))}
    <div className="border-border flex items-center gap-6 border-l pl-8">
      <div className="relative transition-transform hover:scale-110">
        <CartBadge />
      </div>
      <AuthSection
        isLoggedIn={isLoggedIn}
        isInitialized={isInitialized}
        hasHydrated={hasHydrated}
      />
    </div>
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
      <Link
        href="/user"
        className="bg-primary/5 text-primary hover:bg-primary flex h-10 w-10 items-center justify-center rounded-full transition-all hover:text-white"
      >
        <User className="h-5 w-5" />
      </Link>
    );
  }

  return (
    <Link href="/signin">
      <Button className="bg-primary hover:bg-primary/90 rounded-full px-6 font-bold text-white">
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
    <header className="border-border bg-background/80 sticky top-0 z-50 w-full border-b backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between px-6 py-4 md:py-5 lg:px-0">
        <Link
          href="/"
          className="font-heading text-primary flex items-center gap-2 text-2xl font-black tracking-tighter"
        >
          <span className="bg-primary h-8 w-1 rounded-full" />
          FRESH FARM
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
                variant="ghost"
                size="icon"
                className="hover:bg-primary/5"
              >
                <Menu className="text-foreground h-6 w-6" />
                <span className="sr-only">切換選單</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 p-6">
              <SheetTitle className="font-heading text-primary text-left text-xl font-bold">
                選單
              </SheetTitle>
              <nav className="mt-10 flex flex-col gap-2">
                {PUBLIC_ITEMS.map((item) => (
                  <NavLink
                    key={item.href}
                    href={item.href}
                    label={item.label}
                    className="hover:bg-primary/5 rounded-lg px-4 py-3 text-lg"
                    onClick={() => setIsOpen(false)}
                  />
                ))}

                <div className="border-border my-6 border-t pt-6" />

                {hasHydrated && isInitialized && (
                  <div className="space-y-2">
                    {isLoggedIn ? (
                      <>
                        {AUTH_ITEMS.map((item) => (
                          <NavLink
                            key={item.href}
                            href={item.href}
                            label={item.label}
                            className="hover:bg-primary/5 rounded-lg px-4 py-3 text-lg"
                            onClick={() => setIsOpen(false)}
                          />
                        ))}
                        <Button
                          variant="destructive"
                          onClick={() => handleLogout(() => setIsOpen(false))}
                          className="mt-6 w-full rounded-xl"
                        >
                          <LogOut className="mr-2 h-4 w-4" /> 登出
                        </Button>
                      </>
                    ) : (
                      <Link href="/signin" onClick={() => setIsOpen(false)}>
                        <Button className="bg-primary w-full rounded-xl py-6 text-lg">
                          登入 / 註冊
                        </Button>
                      </Link>
                    )}
                  </div>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
