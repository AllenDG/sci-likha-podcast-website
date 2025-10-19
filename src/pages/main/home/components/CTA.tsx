import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

const CTA = () => {
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
      className="relative py-20 flex justify-center items-center"
    >
      <div
        className={`relative w-full px-8 py-16 rounded-2xl transition-all duration-1000 ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
        style={{
          background:
            "linear-gradient(135deg, rgba(173, 231, 146, 0.4), rgba(137, 207, 129, 0.25), rgba(255, 255, 200, 0.2))",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          boxShadow: "0 8px 40px rgba(0, 0, 0, 0.15)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
        }}
      >
        <div className="text-center text-gray-900">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Discover More with Sci-Likha
          </h2>
          <p className="text-gray-800 mb-8 leading-relaxed max-w-3xl mx-auto">
            Expand your understanding of the natural world and explore how
            science shapes innovation, technology, and human discovery.
          </p>
          <Button
            size="lg"
            className="bg-[#163409] hover:bg-[#1e4b0d] text-white px-8 py-6 rounded-md shadow-lg text-base hover:scale-105 transition-transform duration-300"
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
