"use client";

import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

import { UserCard } from "./_components/UserCard";
import { UserTabs } from "./_components/UserTabs";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isOrdersPage = pathname === "/user/orders";

  return (
    <div className="container mx-auto px-3 py-12">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-6">
        {/* 只在非訂單頁面顯示 UserCard */}
        {!isOrdersPage && (
          <aside className="lg:col-span-3">
            <UserCard />
          </aside>
        )}

        <main
          className={cn(
            "flex flex-col",
            isOrdersPage ? "lg:col-span-12" : "lg:col-span-9"
          )}
        >
          {/* Tabs 導覽 */}
          <UserTabs />

          {/* 子頁面內容 */}
          <div className="mt-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
