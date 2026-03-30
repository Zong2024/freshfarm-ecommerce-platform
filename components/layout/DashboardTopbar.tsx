"use client";

import Link from "next/link";

import { Bell, LogOut, Menu, User } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { logout } from "@/lib/store/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

import { DashboardSidebar } from "./DashboardSidebar";

interface DashboardTopbarProps {
  role: "admin" | "farmer";
}

export const DashboardTopbar = ({ role }: DashboardTopbarProps) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="bg-muted/40 flex h-14 items-center justify-between gap-4 border-b px-4 md:justify-end lg:h-15 lg:px-6">
      {/* Mobile Sidebar Trigger */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">切換選單</span>
          </Button>
        </SheetTrigger>

        <SheetContent side="left" className="flex w-64 flex-col p-0">
          {/* --- 無障礙標題 --- */}
          <div className="sr-only">
            <SheetHeader>
              <SheetTitle>導航選單</SheetTitle>
              <SheetDescription>
                移動端導航連結，包含儀表板各項功能。
              </SheetDescription>
            </SheetHeader>
          </div>
          {/* ----------------------- */}

          <DashboardSidebar role={role} />
        </SheetContent>
      </Sheet>

      <div className="flex items-center gap-4">
        <Badge
          variant={role === "admin" ? "destructive" : "secondary"}
          className="hidden sm:inline-flex"
        >
          {role === "admin" ? "管理員模式" : "認證農夫"}
        </Badge>
        <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
          <Bell className="h-4 w-4" />
          <span className="sr-only">通知</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm leading-none font-medium">
                  {role === "admin" ? "Admin User" : "Farmer User"}
                </p>
                <p className="text-muted-foreground text-xs leading-none">
                  {user?.uid || "user@example.com"}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                href={role === "admin" ? "/admin/profile" : "/farmer/profile"}
              >
                個人資料
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/">返回商店</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-8 w-8 rounded-full"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </div>
    </header>
  );
};
