import { Suspense } from "react";

import SearchInput from "./input/SearchInput";

export function SearchBar() {
  return (
    <Suspense
      fallback={<div className="h-12 w-full animate-pulse bg-gray-100" />}
    >
      <SearchInput />
    </Suspense>
  );
}
