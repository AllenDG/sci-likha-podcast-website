"use client";

import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const navLinks = ["Home", "Content", "About"];

const MainNavbar = () => {
  return (
    <header className="bg-[#14320f] shadow-md sticky top-0 z-50">
      <nav className="container mx-auto flex justify-center items-center py-3 px-6 space-x-12">
        {/* Logo */}
        <motion.h1
          className="text-lg md:text-xl font-semibold text-white cursor-pointer"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Sci-Likha
        </motion.h1>

        {/* Nav Links */}
        <ul className="flex space-x-6 text-sm md:text-base font-medium text-white">
          {navLinks.map((link) => (
            <li key={link}>
              <NavLink
                to={link === "Home" ? "/" : `/${link.toLowerCase()}`}
                className={({ isActive }) =>
                  `relative transition-colors duration-300 ${
                    isActive ? "text-green-300" : "hover:text-green-200"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link}</span>
                    {/* Animated underline for active */}
                    <motion.span
                      layoutId="underline"
                      className="absolute left-0 -bottom-1 h-[2px] bg-green-300"
                      initial={false}
                      animate={{ width: isActive ? "100%" : 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavbar;
