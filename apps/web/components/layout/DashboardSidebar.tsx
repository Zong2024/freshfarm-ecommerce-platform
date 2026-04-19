"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  CheckSquare,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingCart,
  Store,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";

interface SidebarItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

interface DashboardSidebarProps {
  role: "admin" | "farmer";
  className?: string;
}

export const DashboardSidebar = ({
  role,
  className,
}: DashboardSidebarProps) => {
  const pathname = usePathname();

  const adminItems: SidebarItem[] = [
    {
      title: "儀表板",
      href: "/admin",
      icon: <LayoutDashboard className="h-4 w-4" />,
    },
    {
      title: "產品審核",
      href: "/admin/products",
      icon: <CheckSquare className="h-4 w-4" />,
    },
    {
      title: "訂單監控",
      href: "/admin/orders",
      icon: <ShoppingCart className="h-4 w-4" />,
    },
    {
      title: "農夫管理",
      href: "/admin/farmers",
      icon: <Users className="h-4 w-4" />,
    },
  ];

  const farmerItems: SidebarItem[] = [
    {
      title: "農場概覽",
      href: "/farmer",
      icon: <LayoutDashboard className="h-4 w-4" />,
    },
    {
      title: "我的產品",
      href: "/farmer/products",
      icon: <Package className="h-4 w-4" />,
    },
    {
      title: "訂單管理",
      href: "/farmer/orders",
      icon: <ShoppingCart className="h-4 w-4" />,
    },
    {
      title: "農場設定",
      href: "/farmer/settings",
      icon: <Store className="h-4 w-4" />,
    },
  ];

  const items = role === "admin" ? adminItems : farmerItems;

  return (
    <aside
      className={cn(
        "g-muted/40 sticky top-0 h-screen w-64 flex-col border-r md:flex",
        className
      )}
    >
      <div className="flex h-15 items-center border-b px-6">
        <Link
          href="/"
          className="text-primary flex items-center gap-2 font-semibold"
        >
          <Store className="text-primary h-6 w-6" />
          <span>FreshFarm 後台</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-4">
          {items.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "hover:text-primary flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                  isActive ? "bg-muted text-primary" : "text-muted-foreground"
                )}
              >
                {item.icon}
                {item.title}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="mt-auto border-t p-4">
        <nav className="grid items-start px-2 text-sm font-medium">
          <Link
            href={role === "admin" ? "/admin/settings" : "/farmer/settings"}
            className={cn(
              "text-muted-foreground hover:text-primary flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
              pathname.includes("settings") && "bg-muted text-primary"
            )}
          >
            <Settings className="h-4 w-4" />
            系統設定
          </Link>
        </nav>
      </div>
    </aside>
  );
};
