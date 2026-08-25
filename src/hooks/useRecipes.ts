import { useState } from "react";
import type { Recipe } from "../types/recipe";
import { searchRecipes } from "../api/mealdb";

export function useSearchRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function search(query: string) {
    setIsLoading(true);
    setError(null);
    try {
      setRecipes(await searchRecipes(query));
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return { recipes, isLoading, error, search };
}
