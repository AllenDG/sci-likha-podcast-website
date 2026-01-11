import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

const CTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 px-4 text-white overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* CTA Content */}
        <div
          className={`bg-white/10 backdrop-blur-md rounded-2xl p-12 md:p-16 shadow-2xl mb-16 border border-white/20 transition-all duration-1000 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
              Sumali sa Aming Komunidad ng Agham
            </h2>
            <p className="text-white/90 mb-8 leading-relaxed drop-shadow">
              Tuklasin ang kahanga-hangang mundo ng ebolusyon sa pamamagitan ng 
              mga engaging na podcast episodes. Mula sa mekanismo ng natural selection 
              hanggang sa kasaysayan ng mga ideya, alamin kung paano humubog ang buhay 
              sa ating planeta.
            </p>
            <Button
              size="lg"
              className="text-white px-8 py-6 rounded-md shadow-lg text-base hover:scale-105 transition-transform duration-300"
              style={{ backgroundColor: "#163409" }}
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