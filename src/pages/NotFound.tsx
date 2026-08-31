import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center gap-8 section-small lg:section">
      <h1 className="text-6xl lg:text-8xl text-center text-dark-red font-bold">
        Page Not Found
      </h1>

      <p className="mb-24 text-center">
        Oops! The page you requested could not be found.
      </p>

      <Button
        label="Go to Home Page"
        variant="green-fill"
        onClick={() => navigate("/")}
      />
    </div>
  );
}

export default NotFound;
