"use client";

import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const navLinks = ["Home", "Content", "About"];

const MainNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="bg-[#14320f] shadow-md sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto flex justify-between items-center py-3 px-4 md:px-6">
        {/* Logo */}
        <motion.h1
          className="text-lg md:text-xl font-semibold text-white cursor-pointer"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Sci-Likha
        </motion.h1>

        {/* Desktop Navigation */}
        {!isMobile && (
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
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
          <button
            onClick={toggleMenu}
            className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}
      </nav>

      {/* Mobile Menu */}
      {isMobile && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: isMenuOpen ? "auto" : 0, 
            opacity: isMenuOpen ? 1 : 0 
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden bg-[#14320f] border-t border-white/10"
        >
          <ul className="py-4 px-4 space-y-2">
            {navLinks.map((link) => (
              <li key={link}>
                <NavLink
                  to={link === "Home" ? "/" : `/${link.toLowerCase()}`}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `block py-3 px-4 rounded-lg transition-colors duration-300 ${
                      isActive 
                        ? "text-green-300 bg-white/10" 
                        : "text-white hover:text-green-200 hover:bg-white/5"
                    }`
                  }
                >
                  {link}
                </NavLink>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </header>
  );
};

export default MainNavbar;
