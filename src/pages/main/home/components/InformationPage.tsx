import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import ep1Thumbnail from "@/assets/images/sci-likha-ep-1.jpg";

const InformationPage = () => {
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
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div
            className={`order-2 md:order-1 transition-all duration-1000 delay-100 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <Card className="overflow-hidden shadow-xl border border-white/20 bg-white/10 backdrop-blur-md hover:shadow-2xl transition-shadow duration-300">
              <CardContent className="p-0">
                <div className="aspect-video relative overflow-hidden rounded-lg">
                  <img
                    src={ep1Thumbnail}
                    alt="Ang Ebolusyon ng Anyong-Buhay sa Kasaysayan ng Mundo"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-black/60 backdrop-blur-sm px-4 py-2 rounded-lg">
                      <p className="text-white/90 font-semibold text-sm">Featured Episode 1</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div
            className={`order-1 md:order-2 transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
              Ang Ebolusyon ng Anyong-Buhay sa Kasaysayan ng Mundo
            </h2>
            <p className="text-white/90 mb-4 leading-relaxed drop-shadow">
              Tuklasin kung paano nag-evolve ang mga buhay na organismo mula sa simpleng porma 
              hanggang sa mga komplikadong nilalang na umiiral ngayon. Alamin ang mga yugto ng 
              pagbabago na humubog sa kasaysayan ng buhay sa ating planeta.
            </p>
            <p className="text-white/80 text-sm mb-6 drop-shadow">
              By Sci Likha Team • Ika-apat na Linggo ng Enero 2025
            </p>
            <Button
              variant="default"
              className="text-white px-6 py-5 rounded-md shadow-lg hover:scale-105 transition-transform duration-300"
              style={{ backgroundColor: "#163409" }}
            >
              Pakinggan ang Episode
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InformationPage;