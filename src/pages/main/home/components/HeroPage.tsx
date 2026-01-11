import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface HeroPageProps {
  scrollY: number;
}

const HeroPage = ({ scrollY }: HeroPageProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const opacity = Math.max(0, 1 - scrollY / 600);
  const translateY = scrollY * 0.3;

  return (
    <section className="relative min-h-screen flex items-center justify-center">
      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-sky-300/30 via-transparent to-transparent pointer-events-none"
        style={{ opacity }}
      />

      <div
        className={`relative z-10 text-center px-4 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
        style={{
          transform: `translateY(${translateY}px)`,
          opacity,
        }}
      >
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-2xl">
          Sci-Likha Podcast
        </h1>
        <p className="text-lg md:text-xl text-white mb-8 max-w-2xl mx-auto drop-shadow-lg">
          Tuklasin ang kahanga-hangang mundo ng ebolusyon at mga prosesong bumubuo sa buhay
        </p>
        <Button
          size="lg"
          className="text-white px-8 py-6 text-lg rounded-md shadow-2xl hover:scale-105 transition-all duration-300"
          style={{ backgroundColor: "#163409" }}
        >
          Makinig Ngayon
        </Button>
      </div>

      {/* Scroll Indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
        style={{ opacity }}
      >
        <svg
          className="w-6 h-6 text-white drop-shadow-lg"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroPage;