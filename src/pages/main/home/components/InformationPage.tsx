import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

const InformationPage = () => {
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
          {/* Left Side - Animated Image or GIF */}
          <div
            className={`order-2 md:order-1 transition-all duration-1000 delay-100 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <Card className="overflow-hidden  border-none bg-transparent">
              <CardContent className="p-0">
                <div className="aspect-video flex items-center justify-center">
                  <img
                    src="/src/assets/others/biology-loop.gif"
                    alt="Biology Animation"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Text Content */}
          <div
            className={`order-1 md:order-2 transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Invitation to Biology
            </h2>
            <p className="text-gray-200 mb-6 leading-relaxed">
              Biology is the scientific study of life, exploring how living
              things grow, interact, and adapt to sustain existence on Earth.
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
        </div>
      </div>
    </section>
  );
};

export default InformationPage;
