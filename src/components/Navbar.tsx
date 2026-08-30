import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar() {
  return (
    <div className="flex justify-between items-center w-full px-24 py-2 top-0 left-0 fixed z-50 bg-white">
      <NavLink to="/">
        <img className="w-[12em]" src={logo} alt="FindMyRecipe" />
      </NavLink>

      <div className="flex gap-6">
        <NavLink
          className={({ isActive }) => `${isActive ? "font-bold" : ""}`}
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) => `${isActive ? "font-bold" : ""}`}
          to="/about"
        >
          About
        </NavLink>
      </div>
    </div>
  );
}

export default Navbar;
