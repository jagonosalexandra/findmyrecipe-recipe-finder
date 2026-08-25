import { useRef } from "react";
import hero from "../assets/hero.png";
import Button from "../components/Button";

function Home() {
  const recipesRef = useRef<HTMLDivElement>(null);

  function scrollToRecipes() {
    recipesRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div>
      <div className="relative overflow-hidden">
        <img
          className="h-screen w-full bg-hero-pattern bg-cover bg-center bg-no-repeat"
          src={hero}
          alt=""
        />
        <div className="absolute inset-y-0 left-24 mt-auto px-8 py-12 max-w-md h-min flex flex-col justify-start items-start gap-3.5 text-white bg-green/80">
          <p className="heading">
            Cook <span className="text-yellow">Smarter</span>, <br /> Not Harder
          </p>
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

      <div ref={recipesRef}>Recipes</div>

      <div>Random</div>
    </div>
  );
}

export default Home;
