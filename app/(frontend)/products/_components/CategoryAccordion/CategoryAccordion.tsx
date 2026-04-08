"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { cn } from "@/lib/utils";

import { CategoryAccordionProps } from "./CategoryAccordion.types";

export const CategoryAccordion = ({
  CategoryData = [],
}: CategoryAccordionProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleFilterClick = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (params.get(key) === value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-lg">
      <Accordion
        type="multiple"
        defaultValue={["origin"]}
        className="space-y-1"
      >
        {CategoryData.map((category) => (
          <AccordionItem
            key={category.id}
            value={category.id}
            className="border-none"
          >
            <AccordionTrigger className="font-heading text-foreground hover:text-primary px-2 py-4 text-lg font-semibold tracking-tight no-underline transition-colors duration-300 hover:no-underline md:text-xl">
              {category.title}
            </AccordionTrigger>
            <AccordionContent className="pb-4">
              <ul className="flex flex-col gap-1 px-1">
                {category.items.map((item) => {
                  const isActive = searchParams.get(category.id) === item;
                  return (
                    <li
                      role="button"
                      tabIndex={0}
                      key={item}
                      onClick={() => handleFilterClick(category.id, item)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          handleFilterClick(category.id, item);
                        }
                      }}
                      className={cn(
                        "group flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium transition-all duration-300",
                        isActive
                          ? "bg-primary shadow-primary/20 text-white shadow-md"
                          : "hover:bg-primary/5 hover:text-primary text-gray-400"
                      )}
                    >
                      <span className="relative">
                        {item}
                        {!isActive && (
                          <span className="bg-primary absolute -bottom-0.5 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full" />
                        )}
                      </span>
                      {isActive && (
                        <div className="h-1.5 w-1.5 rounded-full bg-white" />
                      )}
                    </li>
                  );
                })}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
