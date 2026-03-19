"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { Search } from "lucide-react";

import { Input } from "./ui/input";

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultQuery = searchParams.get("q") || "";

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.currentTarget);
  //   const keyword = formData.get("q") as string;

  //   if (keyword.trim()) {
  //     router.push(`/products?q=${encodeURIComponent(keyword.trim())}`);
  //   } else {
  //     router.push(`/products`);
  //   }
  // };

  const handleSubmit = async (formData: FormData) => {
    const keyword = formData.get("q")?.toString() || "";
    if (keyword.trim()) {
      router.push(`/products?q=${encodeURIComponent(keyword.trim())}`);
    } else {
      router.push(`/products`);
    }
  };

  return (
    <form action={handleSubmit} className="relative mb-6 w-full max-w-2xl">
      <div className="relative">
        <Input
          type="text"
          name="q"
          placeholder="搜尋產品..."
          defaultValue={defaultQuery}
          key={defaultQuery}
          className="focus:border-primary-400 h-12 w-full rounded-md border-gray-200 bg-white shadow-sm placeholder:text-gray-300"
        />
        <Search className="text-primary-400 absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2" />
      </div>
    </form>
  );
}
