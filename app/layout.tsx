import type { Metadata } from "next";
import { Noto_Sans_TC, Lato } from "next/font/google";
import "./globals.css";

const notoSTC = Noto_Sans_TC({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-noto-sans-tc",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
  display: "swap",
});

export const metadata: Metadata = {
  title: "freshfarm",
  description: "",
};

import StoreProvider from "@/lib/store/StoreProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${notoSTC.variable} ${lato.variable} antialiased`}>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
