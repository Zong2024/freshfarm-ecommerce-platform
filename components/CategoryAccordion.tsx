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
                {category.items.map((item) => (
                  <li
                    key={item}
                    className="cursor-pointer rounded px-4 py-3 text-black hover:font-bold"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};
