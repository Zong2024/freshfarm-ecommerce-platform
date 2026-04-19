import { Suspense } from "react";

import Link from "next/link";

import { ChevronDown, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { CATEGORY_DATA } from "@/lib/constants";

import { CategoryAccordion } from "./CategoryAccordion";

interface ProductAsideProps {
  allProductsUrl: string;
}

export const ProductAside = ({ allProductsUrl }: ProductAsideProps) => {
  return (
    <aside className="md:col-span-3">
      <div className="md:hidden">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="h-12 w-full justify-between border border-gray-200 bg-white px-3 py-4 text-gray-300"
            >
              <span className="text-base">產品分類</span>
              <ChevronDown className="size-4 text-black" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="border-primary-200 w-[calc(100vw-1rem)] rounded-lg bg-white p-4 shadow-xl">
            <Link
              href={allProductsUrl}
              className="block px-1 py-2 hover:font-bold"
            >
              所有產品
            </Link>
            <Suspense
              fallback={
                <div className="flex h-20 items-center justify-center">
                  <Loader2 className="text-primary-400 h-6 w-6 animate-spin" />
                </div>
              }
            >
              <CategoryAccordion CategoryData={CATEGORY_DATA} />
            </Suspense>
          </PopoverContent>
        </Popover>
      </div>
      <div className="hidden md:block">
        <Link
          href={allProductsUrl}
          className="text-primary-300 border-primary-200 hover:text-primary-400 mb-2 block border-t border-b py-4 text-xl font-bold"
        >
          所有商品
        </Link>
        <Suspense
          fallback={
            <div className="flex h-20 items-center justify-center">
              <Loader2 className="text-primary-400 h-6 w-6 animate-spin" />
            </div>
          }
        >
          <CategoryAccordion CategoryData={CATEGORY_DATA} />
        </Suspense>
      </div>
    </aside>
  );
};
