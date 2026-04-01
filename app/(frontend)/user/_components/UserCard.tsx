"use client";

import { useLogout } from "@/hooks/useLogout";
import { Cake, LogOut, Truck } from "lucide-react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export const UserCard = () => {
  const { handleLogout } = useLogout();

  return (
    <Card className="mx-auto w-full max-w-sm overflow-hidden rounded-lg border border-gray-200 shadow-sm">
      <CardContent className="flex flex-col items-center gap-4 p-6 text-center">
        {/* 頭像 */}
        <Avatar className="h-25 w-25 rounded-2xl border-none">
          <AvatarImage
            src="/api/placeholder/120/120"
            className="object-cover"
          />
        </Avatar>

        {/* 標題與等級 */}
        <div>
          <h2 className="text-primary-400 mb-2 text-2xl font-bold">陳小農</h2>
          <p className="font-bold">會員等級：銅級</p>
        </div>

        {/* 消費數據 */}
        <div className="w-full space-y-2">
          <div className="flex items-center justify-between text-sm">
            <p className="">年度累積消費</p>
            <p className="font-bold">NT$900</p>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="">距離下一等級還差</span>
            <p className="text-secondary-300 font-bold">NT$1100</p>
          </div>
        </div>

        {/* 進度條 */}
        <div className="w-full">
          <Progress value={45} className="h-3 bg-gray-100" />
        </div>

        {/* 專屬優惠 */}
        <div className="w-full text-left">
          <h3 className="text-primary-400 mb-2 font-bold">專屬優惠</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-1">
              <Cake className="text-primary-300 h-5 w-5" />
              <span>生日禮 單筆訂單8折</span>
            </li>
            <li className="flex items-center gap-1">
              <Truck className="text-primary-300 h-5 w-5" />
              <span>月免運*1</span>
            </li>
          </ul>
        </div>

        {/* 登出按鈕 */}
        <div className="mt-4 w-full">
          <button
            onClick={() => handleLogout()}
            className="text-danger flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-gray-100 py-4 transition-colors hover:bg-gray-200"
          >
            <span>登出</span>
            <LogOut size={18} />
          </button>
        </div>
      </CardContent>
    </Card>
  );
};
