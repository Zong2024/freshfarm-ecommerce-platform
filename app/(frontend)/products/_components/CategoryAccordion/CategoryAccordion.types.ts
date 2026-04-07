export type CategoryItem = {
  id: string;
  title: string;
  items: string[];
};

export type CategoryAccordionProps = {
  CategoryData: CategoryItem[];
};
