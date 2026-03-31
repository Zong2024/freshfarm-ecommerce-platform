import { Suspense } from "react";

import { SearchBarProps } from "./SearchBar.types";
import { SearchInput } from "./SearchInput";

export const SearchBar = (props: SearchBarProps) => {
  return (
    <Suspense
      fallback={
        <div className="mb-6 h-12 w-full max-w-2xl animate-pulse rounded-md bg-gray-100" />
      }
    >
      <SearchInput {...props} />
    </Suspense>
  );
};
