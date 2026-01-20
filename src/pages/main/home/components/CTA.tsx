import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Call-to-Action component for homepage
 * Encourages users to explore podcast content
 */
const CTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  // Intersection observer for animation trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Navigate to content page with smooth scroll
  const handleListenNow = useCallback(() => {
    navigate("/content");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [navigate]);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-20 px-4 text-white overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* CTA Content Card */}
        <div
          className={`bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12 shadow-2xl border border-white/20 transition-all duration-1000 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg">
              Sumali sa Aming Komunidad ng Agham
            </h2>
            <p className="text-white/90 mb-8 leading-relaxed drop-shadow text-sm md:text-base">
              Tuklasin ang kahanga-hangang mundo ng ebolusyon sa pamamagitan ng 
              mga engaging na podcast episodes. Mula sa mekanismo ng natural selection 
              hanggang sa kasaysayan ng mga ideya, alamin kung paano humubog ang buhay 
              sa ating planeta.
            </p>
            <Button
              onClick={handleListenNow}
              size="lg"
              className="text-white px-6 md:px-8 py-3 md:py-4 rounded-md shadow-lg text-sm md:text-base hover:scale-105 transition-transform duration-300 bg-[#163409] hover:bg-[#1b3e0d]"
              aria-label="Navigate to content page to listen to episodes"
            >
              Makinig Ngayon
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;