import { useEffect, useRef } from "react";
import hero from "../assets/hero.png";
import random from "../assets/random.png";
import { useSearch } from "../context/SearchContext";
import Button from "../components/Button";
import SearchBar from "../components/SearchBar";
import { useNavigate } from "react-router-dom";
import { useRandom } from "../hooks/useRecipes";
import LoadingSpinner from "../components/LoadingSpinner";
import RecipeCard from "../components/RecipeCard";

function Home() {
  const { search } = useSearch();
  const {
    randomRecipes,
    fetchRandomRecipe,
    fetchRandomRecipes,
    isLoading,
    error,
  } = useRandom();
  const navigate = useNavigate();

  function handleSearch(query: string) {
    search(query);
    navigate("/search");
  }

  async function handleSurpriseMe() {
    const recipe = await fetchRandomRecipe();
    if (recipe) navigate(`/recipe/${recipe.id}`);
  }

  const recipesRef = useRef<HTMLDivElement>(null);

  function scrollToRecipes() {
    recipesRef.current?.scrollIntoView();
  }

  useEffect(() => {
    fetchRandomRecipes(6);
  }, []);

  return (
    <div>
      <div className="relative min-h-140 w-full flex items-end lg:items-center overflow-hidden">
        <img
          className="absolute inset-0 w-full h-full object-cover object-center"
          src={hero}
          alt="Hero Background"
        />

        <div className="absolute bottom-0 z-10 md:ml-8 lg:ml-24 h-full md:h-min w-full md:max-w-lg p-8 lg:p-12 flex flex-col justify-start items-start gap-4 sm:gap-6 text-white bg-green/90">
          <h1 className="heading">
            Cook <span className="text-yellow">Smarter</span>, <br />
            Not Harder
          </h1>

          <p className="font-body text-sm sm:text-base mb-8 lg:mb-12">
            FindMyRecipe gives you total control. Narrow down options by
            cuisine, diet, and meal type, or shake things up with a surprise
            random pick. Once you find the one, dive into a dedicated recipe
            page with ingredients and instructions.
          </p>

          <Button
            label="Find My Recipe"
            variant="white"
            onClick={scrollToRecipes}
          />
        </div>
      </div>

      <div className="section-small lg:section" ref={recipesRef}>
        <h2 className="heading2-small lg:heading2">
          Browse through thousands of recipes
        </h2>

        <SearchBar search={handleSearch} />

        {isLoading && <LoadingSpinner />}
        {error && <p className="error-text">{error}</p>}
        {!isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 xl:gap-8 mt-16">
            {randomRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                id={recipe.id}
                thumbnail={recipe.thumbnail}
                name={recipe.name}
                category={recipe.category}
              />
            ))}
          </div>
        )}
      </div>

      <div className="section-small lg:section flex flex-col justify-center items-center bg-red-orange text-white">
        <img className="w-24 lg:w-36" src={random} alt="" />
        <p className="text-3xl lg:text-5xl font-bold text-center mb-6">
          Haven't decided yet? <br />
          <span className="text-yellow">Let us surprise you!</span>
        </p>
        <p className="w-full lg:w-[50%] text-center mb-24">
          Feeling adventurous? Click the button and let fate pick your next
          meal. From quick breakfasts to decadent desserts, your next favorite
          dish is just one click away.
        </p>

        <Button
          label="Surprise me!"
          variant="white"
          onClick={handleSurpriseMe}
        />
      </div>
    </div>
  );
}

export default Home;
