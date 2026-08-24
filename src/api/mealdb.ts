import type { Ingredient, Meal, MealDBResponse, Recipe } from "../types/recipe";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1/";

function toRecipe(meal: Meal): Recipe {
  const ingredients: Ingredient[] = Array.from({ length: 20 }, (_, i) => i + 1)
    .map((i) => ({
      name: meal[`strIngredient${i}` as keyof Meal] as string,
      measure: meal[`strMeasure${i}` as keyof Meal] as string,
    }))
    .filter((item) => item.name);

  return {
    id: meal.idMeal,
    name: meal.strMeal,
    category: meal.strCategory,
    area: meal.strArea,
    country: meal.strCountry,
    instructions: meal.strInstructions,
    thumbnail: meal.strMealThumb,
    youtube: meal.strYoutube,
    ingredients,
  };
}

async function searchRecipes(query: string): Promise<Recipe[]> {
  const url = `${BASE_URL}search.php?s=${encodeURIComponent(query)}`;

  try {
    const response: Response = await fetch(url);

    if (!response.ok)
      throw new Error(`API request failed with status: ${response.status}`);

    const data = (await response.json()) as MealDBResponse;

    return data.meals?.map((meal) => toRecipe(meal)) ?? [];
  } catch (error) {
    if (error instanceof Error) {
      console.error("Fetch error: ", error.message);
    }
    throw error;
  }
}

async function getRecipeById(id: string): Promise<Recipe | null> {
  const url = `${BASE_URL}lookup.php?i=${encodeURIComponent(id)}`;

  try {
    const response: Response = await fetch(url);

    if (!response.ok)
      throw new Error(`API request failed with status: ${response.status}`);

    const data = (await response.json()) as MealDBResponse;

    return data.meals && data.meals.length !== 0
      ? toRecipe(data.meals[0])
      : null;
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        `Failed to fetch recipe with id ${id} with error ${error.message}`,
      );
    }
    throw error;
  }
}

async function getRecipeByFirstLetter(letter: string): Promise<Recipe[]> {
  const url = `${BASE_URL}search.php?f=${encodeURIComponent(letter)}`;

  try {
    const response: Response = await fetch(url);

    if (!response.ok)
      throw new Error(`API request failed with status: ${response.status}`);

    const data = (await response.json()) as MealDBResponse;

    return data.meals?.map((meal) => toRecipe(meal)) ?? [];
  } catch (error) {
    if (error instanceof Error) {
      console.error("Fetch error:", error.message);
    }
    throw error;
  }
}

async function getRandomRecipe(): Promise<Recipe | null> {
  const url = `${BASE_URL}random.php`;

  try {
    const response: Response = await fetch(url);

    if (!response.ok)
      throw new Error(`API request failed with status: ${response.status}`);

    const data = (await response.json()) as MealDBResponse;

    return data.meals && data.meals.length !== 0
      ? toRecipe(data.meals[0])
      : null;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Fetch error:", error.message);
    }
    throw error;
  }
}

export {
  searchRecipes,
  getRecipeById,
  getRecipeByFirstLetter,
  getRandomRecipe,
};
