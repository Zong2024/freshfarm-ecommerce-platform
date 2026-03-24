import { CartInitializer } from "@/components/CartInitializer";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen min-w-[320px] flex-col">
      <CartInitializer />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
