// src/components/shared/MainNavbar.tsx
import { NavLink } from "react-router-dom";

const MainNavbar = () => {
  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto flex justify-between items-center py-4 px-6">
        <h1 className="text-2xl font-semibold text-blue-600">
          Sci Likha Podcast
        </h1>
        <ul className="flex space-x-6">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-semibold" : "text-gray-700"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/content"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-semibold" : "text-gray-700"
              }
            >
              Content
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-semibold" : "text-gray-700"
              }
            >
              About
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavbar;
