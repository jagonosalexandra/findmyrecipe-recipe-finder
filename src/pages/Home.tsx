import { useEffect, useRef } from "react";
import hero from "../assets/hero.png";
import { useSearch } from "../context/SearchContext";
import Button from "../components/Button";
import SearchBar from "../components/SearchBar";
import { useNavigate } from "react-router-dom";
import { useRandom } from "../hooks/useRecipes";
import LoadingSpinner from "../components/LoadingSpinner";
import RecipeCard from "../components/RecipeCard";

function Home() {
  const { search } = useSearch();
  const { randomRecipes, fetchRandomRecipes, isLoading, error } = useRandom();
  const navigate = useNavigate();

  function handleSearch(query: string) {
    search(query);
    navigate("/search");
  }

  const recipesRef = useRef<HTMLDivElement>(null);

  function scrollToRecipes() {
    recipesRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    fetchRandomRecipes(6);
  }, []);

  return (
    <div>
      <div className="relative overflow-hidden">
        <img
          className="h-screen w-full bg-hero-pattern bg-cover bg-center bg-no-repeat"
          src={hero}
          alt=""
        />
        <div className="absolute inset-y-0 left-24 mt-auto px-8 py-12 max-w-md h-min flex flex-col justify-start items-start gap-3.5 text-white bg-green/80">
          <h1 className="heading">
            Cook <span className="text-yellow">Smarter</span>, <br /> Not Harder
          </h1>
          <p className="font-body mb-4">
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

      <div className="section" ref={recipesRef}>
        <h2>Browse through thousands of recipes</h2>

        <SearchBar search={handleSearch} />

        <div className="flex flex-wrap justify-between items-center gap-8 mt-16">
          {isLoading && <LoadingSpinner />}
          {error && <p className="error-text">{error}</p>}
          {!isLoading &&
            randomRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                id={recipe.id}
                thumbnail={recipe.thumbnail}
                name={recipe.name}
                category={recipe.category}
              />
            ))}
        </div>
      </div>

      <div>Random</div>
    </div>
  );
}

export default Home;
