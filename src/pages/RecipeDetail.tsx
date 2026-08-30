import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import YouTube from "react-youtube";
import { useRecipe } from "../hooks/useRecipes";
import LoadingSpinner from "../components/LoadingSpinner";
import category from "../assets/icons/category.png";
import area from "../assets/icons/area.png";
import country from "../assets/icons/country.png";
import ingredient from "../assets/icons/ingredient.png";
import Button from "../components/Button";

function RecipeDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { recipe, fetchRecipe, isLoading, error } = useRecipe();
  const videoId = recipe?.youtube ? getYouTubeEmbedUrl(recipe.youtube) : null;

  useEffect(() => {
    if (id) fetchRecipe(id);
  }, [id]);

  function parseInstructions(raw: string): string[] {
    if (!raw) return [];

    const rawSteps = raw
      .replace(/\r\n\r\n/g, "\n")
      .replace(/\r\n/g, "\n")
      .split("\n");

    const formattedSteps: string[] = [];

    rawSteps.forEach((step) => {
      let cleanStep = step.trim();
      if (!cleanStep) return;

      cleanStep = cleanStep.replace(/^(step\s*\d+[:.-]?|\d+[:.-]?|•)\s*/i, "");

      if (cleanStep.length > 2) {
        formattedSteps.push(cleanStep);
      }
    });

    if (formattedSteps.length === 1 && formattedSteps[0].includes(". ")) {
      return formattedSteps[0]
        .split(/(?<=\.)\s+/)
        .map((s) => s.trim())
        .filter((s) => s.length > 2);
    }

    return formattedSteps;
  }

  function getYouTubeEmbedUrl(url: string): string | null {
    const parsedUrl = new URL(url);
    return parsedUrl.searchParams.get("v");
  }

  if (isLoading) return <LoadingSpinner />;
  if (error) return <p className="error-text">{error}</p>;
  if (!recipe)
    return (
      <div className="flex flex-col justify-center items-center gap-8 section">
        <p className="text-8xl text-dark-red font-bold">Recipe Not Found</p>
        <p>Oops! The recipe you're looking for could not be found.</p>

        <Button
          label="Go to Home Page"
          variant="green-fill"
          onClick={() => navigate("/")}
        />
      </div>
    );

  return (
    <div>
      <div className="flex items-center gap-12 bg-green">
        <img src={recipe.thumbnail} alt={recipe.name} />

        <div className="pr-24">
          <h1 className="heading mb-6 text-yellow">{recipe.name}</h1>
          <p className="text-lg text-white">
            <span className="flex items-center gap-4 my-2">
              <img src={category} alt="Category" />
              {recipe.category}
            </span>
            {recipe.area && (
              <span className="flex items-center gap-4 my-2">
                <img src={area} alt="Area" />
                {recipe.area}
              </span>
            )}
            <span className="flex items-center gap-4 my-2">
              <img src={country} alt="Country" />
              {recipe.country}
            </span>
          </p>
        </div>
      </div>

      <div className="section">
        <h2>Ingredients</h2>

        <div className="grid grid-cols-3 gap-4 p-12 bg-green text-white">
          {recipe.ingredients.map(({ name, measure }, index) => (
            <p className="flex items-center gap-4" key={index}>
              <img className="w-6" src={ingredient} alt="" />
              {measure} {name}
            </p>
          ))}
        </div>
      </div>

      <div className="section">
        <h2>Instructions</h2>

        <div>
          {parseInstructions(recipe.instructions).map((step, index) => (
            <p
              key={index}
              className="mb-10 pb-8 border-b-[3px] border-red-orange"
            >
              <span className="block mb-2.5 text-2xl font-bold">
                Step {index + 1}
              </span>
              {step}
            </p>
          ))}
        </div>
      </div>

      {videoId && (
        <div className="section bg-red-orange">
          <h2>Watch Video Tutorial</h2>
          <YouTube
            videoId={videoId}
            opts={{
              width: "100%",
              height: "600",
              playerVars: { autoplay: 0 },
            }}
          />
        </div>
      )}
    </div>
  );
}

export default RecipeDetail;
