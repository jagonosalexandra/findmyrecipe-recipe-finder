import header from "../assets/header.png";
import about1 from "../assets/about1.png";
import about2 from "../assets/about2.png";

function About() {
  return (
    <div>
      <div className="section-small lg:section relative bg-green">
        <h1 className="heading-small lg:heading lg:pb-16 text-center text-white">
          About Us
        </h1>
        <img
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-6xl object-contain"
          src={header}
          alt=""
        />
      </div>

      <div className="section-small lg:section flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
        <img className="w-32 lg:w-68" src={about1} alt="" />
        <div className="flex flex-col gap-8 text-md lg:text-xl text-center lg:text-left">
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

      <div className="section-small lg:section">
        <h2 className="heading2-small lg:heading2">Features</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="p-6 min-h-48 lg:min-h-54 border-4 border-green">
            <p className="text-lg lg:text-xl font-bold">Search by name</p>
            <hr className="border-none h-0.5 my-4 bg-green" />
            <p className="text-sm lg:text-base">
              Type any dish and find it instantly.
            </p>
          </div>

          <div className="p-6 min-h-48 lg:min-h-54 border-4 border-green">
            <p className="text-lg lg:text-xl font-bold">Surprise me!</p>
            <hr className="border-none h-0.5 my-4 bg-green" />
            <p className="text-sm lg:text-base">
              Feeling indecisive? Get a random recipe pulled fresh from
              thousands of dishes.
            </p>
          </div>

          <div className="p-6 min-h-48 lg:min-h-54 border-4 border-green">
            <p className="text-lg lg:text-xl font-bold">
              Detailed recipe pages
            </p>
            <hr className="border-none h-0.5 my-4 bg-green" />
            <p className="text-sm lg:text-base">
              Every dish comes with a full list of ingredients, step-by-step
              instructions, and even a YouTube video link for visual guidance
            </p>
          </div>
        </div>
      </div>

      <div className="section-small lg:section bg-red-orange">
        <div className="flex flex-col items-center justify-center gap-1.5">
          <img className="w-32 lg:w-56" src={about2} alt="" />
          <h2 className="heading2-small lg:heading2 text-white">Data Source</h2>
        </div>
        <p className="mt-8 text-md lg:text-xl text-center text-white">
          All recipe data is provided by{" "}
          <a
            className="text-yellow font-bold"
            href="https://www.themealdb.com/"
            target="_blank"
            rel="noopener noreferrer"
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
