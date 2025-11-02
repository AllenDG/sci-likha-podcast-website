/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";


const FirstContentSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 px-4 text-white overflow-hidden"
    >
      <div className="relative max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Side - Parallax Image */}
          <div
            className={`order-2 md:order-1 transition-all duration-1000 delay-100 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            
          </div>

          {/* Right Side - Text Content */}
          <div
            className={`order-1 md:order-2 transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
              The Beginning of Life
            </h2>
            <p className="text-white/90 mb-4 leading-relaxed drop-shadow">
              Every living thing begins with a single unit — the <b>cell</b>. It
              is the foundation of life, responsible for growth, energy, and
              reproduction. Understanding how cells work helps us grasp how life
              itself evolved and continues to thrive.
            </p>
            <p className="text-white/90 mb-6 leading-relaxed drop-shadow">
              In <em>Sci-Likha</em>, we dive deep into these microscopic worlds —
              from discovering how cells function, to exploring the processes
              that drive their division, communication, and adaptation across
              living organisms.
            </p>
            <Button
              variant="default"
              className="text-white px-6 py-5 rounded-md shadow-lg hover:scale-105 transition-transform duration-300"
              style={{
                backgroundColor: "#163409",
              }}
            >
              Explore the Episodes
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FirstContentSection;
