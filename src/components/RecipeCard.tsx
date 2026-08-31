import { Link } from "react-router-dom";

function RecipeCard({
  id,
  thumbnail,
  name,
  category,
}: {
  id: string;
  thumbnail: string;
  name: string;
  category: string;
}) {
  return (
    <Link
      to={`/recipe/${id}`}
      className="flex flex-col items-start border-4 border-red-orange md:min-h-108 hover:border-green transition-colors duration-300"
    >
      <img
        className="w-full md:h-64 object-cover object-center"
        src={thumbnail}
        alt={name}
      />
      <p className="flex flex-col p-6">
        <span className="text-gray-400">{category}</span>
        <span className="text-lg sm:text-2xl font-bold">{name}</span>
      </p>
    </Link>
  );
}

export default RecipeCard;
