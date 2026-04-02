"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

type CategoryItem = {
  id: string;
  title: string;
  items: string[];
};

type CategoryAccordionProps = {
  CategoryData: CategoryItem[];
};

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
    <>
      <Accordion type="multiple" defaultValue={["origin"]} className="max-w-lg">
        {CategoryData.map((category) => (
          <AccordionItem key={category.id} value={category.id}>
            <AccordionTrigger className="md:text-primary-300 hover:text-primary-400 b px-1 py-3 md:py-4 md:text-xl">
              {category.title}
            </AccordionTrigger>
            <AccordionContent>
              <ul className="md:bg-primary-100 flex flex-col">
                {category.items.map((item) => {
                  const isActive = searchParams.get(category.id) === item;
                  return (
                    <li
                      key={item}
                      onClick={() => handleFilterClick(category.id, item)}
                      className={cn(
                        "cursor-pointer rounded px-4 py-3 text-black hover:font-bold",
                        isActive &&
                          "text-primary-400 bg-primary-200/20 font-bold"
                      )}
                    >
                      {item}
                    </li>
                  );
                })}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};
