import { Metadata } from "next";

export const metadata: Metadata = {
  title: "身分驗證 | FreshFarm",
  description: "登入您的 FreshFarm 帳號以開始購物",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="bg-background min-h-screen">{children}</div>;
}
