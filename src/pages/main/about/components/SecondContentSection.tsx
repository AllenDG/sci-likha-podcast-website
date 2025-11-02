import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";


const SecondContentSection = () => {
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
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
          {/* Left Side - Text Content */}
          <div
            className={`order-1 md:order-1 transition-all duration-1000 delay-100 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
              Energy and Life
            </h2>
            <p className="text-white/90 mb-4 leading-relaxed drop-shadow">
              All living things require energy and nutrients to survive.
              Producers make their own food through photosynthesis, while
              consumers obtain energy by feeding on other organisms.
            </p>
            <p className="text-white/90 mb-6 leading-relaxed drop-shadow">
              Through metabolism, organisms sense and respond to changes,
              maintain homeostasis, grow, develop, and reproduce—passing DNA to
              offspring and contributing to life's incredible diversity.
            </p>
            <Button
              variant="default"
              className="text-white px-6 py-5 rounded-md shadow-lg hover:scale-105 transition-transform duration-300"
              style={{
                backgroundColor: "#163409",
              }}
            >
              Learn More
            </Button>
          </div>

          {/* Right Side - Parallax Image */}
          <div
            className={`order-2 md:order-2 transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <Card className="overflow-hidden border-none bg-transparent">
              <CardContent className="p-0">
               
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecondContentSection;
