"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const tabs = [
  { label: "個人帳戶", href: "/user/profile" },
  { label: "我的收藏", href: "/user/collections" },
  { label: "訂單查詢", href: "/user/orders" },
];

export const UserTabs = () => {
  const pathname = usePathname();

  return (
    <div className="flex justify-center border-b border-gray-200">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "w-100 px-6 py-3 text-center text-lg font-bold transition-all duration-200",
              isActive
                ? "border-primary-400 text-primary-400 border-b-4"
                : "hover:text-primary-300 text-gray-400"
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
};
