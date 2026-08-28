import { useState } from "react";
import type { Recipe } from "../types/recipe";
import { getRandomRecipe, getRecipeById, searchRecipes } from "../api/mealdb";

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

export function useRandom() {
  const [randomRecipes, setRandomRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchOneRandom(): Promise<Recipe | null> {
    return getRandomRecipe();
  }

  async function fetchRandomRecipe() {
    setIsLoading(true);
    setError(null);

    try {
      return await fetchOneRandom();
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

  async function fetchRandomRecipes(count: number) {
    const seenIds = new Set<string>();

    setIsLoading(true);
    setError(null);

    try {
      while (seenIds.size < count) {
        const recipe = await fetchOneRandom();

        if (recipe && !seenIds.has(recipe.id)) {
          seenIds.add(recipe.id);
          setRandomRecipes((recipes) => [...recipes, recipe]);
        }
      }
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

  return {
    randomRecipes,
    fetchRandomRecipe,
    fetchRandomRecipes,
    isLoading,
    error,
  };
}

export function useRecipe() {
  const [recipe, setRecipe] = useState<Recipe>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchRecipe(id: string) {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getRecipeById(id);
      if (data) setRecipe(data);
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

  return { recipe, fetchRecipe, isLoading, error };
}
