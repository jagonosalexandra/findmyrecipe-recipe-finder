import header from "../assets/header.png";
import about1 from "../assets/about1.png";
import about2 from "../assets/about2.png";

function About() {
  return (
    <div>
      <div className="section relative bg-green">
        <h1 className="heading pb-16 text-center text-white">About Us</h1>
        <img className="absolute bottom-0" src={header} alt="" />
      </div>

      <div className="section flex gap-16 items-center">
        <img src={about1} alt="" />
        <div className="flex flex-col gap-8 text-xl">
          <p>
            FindMyRecipe is a recipe discovery platform designed to make cooking
            easier and more enjoyable.
          </p>

          <p>
            <span className="block font-bold">Why we built this: </span>
            Meal planning can be overwhelming. With so many recipes out there,
            it's hard to find the right one quickly. FindMyRecipe solves this by
            offering a clean, filterable search experience that puts the right
            recipe in front of you—fast.
          </p>
        </div>
      </div>

      <div className="section">
        <h2>Features</h2>

        <div className="grid grid-cols-3 gap-8">
          <div className="p-6 min-h-54 border-4 border-green">
            <p className="text-xl font-bold">Search by name</p>
            <hr className="border-none h-0.5 my-4 bg-green" />
            <p className="text-base">Type any dish and find it instantly.</p>
          </div>

          <div className="p-6 min-h-54 border-4 border-green">
            <p className="text-xl font-bold">Surprise me!</p>
            <hr className="border-none h-0.5 my-4 bg-green" />
            <p className="text-base">
              Feeling indecisive? Get a random recipe pulled fresh from
              thousands of dishes.
            </p>
          </div>

          <div className="p-6 min-h-54 border-4 border-green">
            <p className="text-xl font-bold">Detailed recipe pages</p>
            <hr className="border-none h-0.5 my-4 bg-green" />
            <p className="text-base">
              Every dish comes with a full list of ingredients, step-by-step
              instructions, and even a YouTube video link for visual guidance
            </p>
          </div>
        </div>
      </div>

      <div className="section bg-red-orange">
        <div className="flex flex-col items-center justify-center gap-1.5">
          <img src={about2} alt="" />
          <h2 className="text-white">Data Source</h2>
        </div>
        <p className="mt-8 text-xl text-center text-white">
          All recipe data is provided by{" "}
          <a
            className="text-yellow font-bold"
            href="https://www.themealdb.com/"
            target="_blank"
          >
            TheMealDB
          </a>
          , a free and open recipe API.
        </p>
      </div>
    </div>
  );
}

export default About;
