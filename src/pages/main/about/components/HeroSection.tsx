import { useEffect, useState } from "react";
import { Microscope, Leaf, Atom } from "lucide-react";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-200/60 via-emerald-200/60 to-lime-200/60 backdrop-blur-sm" />

      {/* Floating Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Microscope
          className="absolute top-20 left-10 w-16 h-16 text-white/20 animate-float"
          style={{ animationDelay: "0s" }}
        />
        <Leaf
          className="absolute top-40 right-20 w-20 h-20 text-white/20 animate-float"
          style={{ animationDelay: "1s" }}
        />
        <Atom
          className="absolute bottom-32 left-1/4 w-12 h-12 text-white/20 animate-float"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div
        className={`relative z-10 max-w-4xl mx-auto px-4 text-center transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl">
          About Sci-Likha
        </h1>
        <p className="text-xl md:text-2xl text-white leading-relaxed max-w-3xl mx-auto drop-shadow-lg">
          Exploring the wonders of science through engaging podcasts that make
          biology accessible, fascinating, and relevant to everyone.
        </p>
      </div>

      {/* Animated CSS for floating effect */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
