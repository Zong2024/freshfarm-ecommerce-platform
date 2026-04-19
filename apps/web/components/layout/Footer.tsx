import Link from "next/link";

export const Footer = () => {
  const LINK_ITEMS = [
    { label: "常見問題", href: "/qa" },
    { label: "聯絡我們", href: "/contact" },
    { label: "隱私權政策", href: "/privacy" },
    { label: "關於我們", href: "/about" },
  ];
  return (
    <footer className="bg-accent text-white">
      <div className="container mx-auto flex flex-col items-center justify-center gap-6 py-12 md:py-15">
        <Link
          href="/"
          className="text-xl font-bold tracking-wider hover:opacity-80"
        >
          Logo
        </Link>
        <nav className="flex flex-col items-center gap-6 md:flex-row">
          {LINK_ITEMS.map((item) => (
            <Link key={`${item.label}-${item.href}`} href={item.href}>
              <span className="hover:text-primary-300">{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="w-full max-w-xs border-t border-white/10" />
        <span className="text-[12px] text-gray-200">
          Copyright © FreshFarm 2025 All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};
