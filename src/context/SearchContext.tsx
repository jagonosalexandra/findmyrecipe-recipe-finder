/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from "react";
import type { Recipe } from "../types/recipe";
import { useSearchRecipes } from "../hooks/useRecipes";

interface SearchContextType {
  recipes: Recipe[];
  isLoading: boolean;
  error: string | null;
  search: (query: string) => Promise<void>;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchState = useSearchRecipes();

  return (
    <SearchContext.Provider value={searchState}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context)
    throw new Error("useSearch must be used within a SearchContextProvider");
  return context;
}
