"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Search } from "lucide-react";

import { Input } from "../ui/input";

export default function SearchInput() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const defaultQuery = searchParams.get("q") ?? "";

  const handleSearch = (formData: FormData) => {
    const keyword = formData.get("q")?.toString() || "";
    const params = new URLSearchParams(searchParams.toString());
    if (keyword.trim()) {
      params.set("q", keyword.trim());
      params.delete("page");
    } else {
      params.delete("q");
    }
    router.push(`${pathname}?${params.toString()}`);
  };
  return (
    <form action={handleSearch} className="relative mb-6 w-full max-w-2xl">
      <div className="relative">
        <Input
          name="q"
          type="text"
          placeholder="搜尋產品..."
          defaultValue={defaultQuery}
          key={defaultQuery}
          className="focus:border-primary-400 h-12 w-full rounded-md border-gray-200 bg-white shadow-sm"
        />
        <Search className="text-primary-400 absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2" />
      </div>
    </form>
  );
}
