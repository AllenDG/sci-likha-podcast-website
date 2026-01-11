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
          {/* Left Side - Placeholder for Image */}
          <div
            className={`order-2 md:order-1 transition-all duration-1000 delay-100 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            {/* Image placeholder */}
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
              Educational Platform for STEM Students
            </h2>
            <p className="text-white/90 mb-4 leading-relaxed drop-shadow">
              The Sci-Likha Podcast is an educational platform designed to enhance 
              students' understanding of biology, with particular focus on learners 
              in the STEM strand. It serves as a reliable academic guide that supports 
              and simplifies the study of complex biological concepts.
            </p>
            <p className="text-white/90 mb-6 leading-relaxed drop-shadow">
              Sci-Likha Podcast delivers innovative and effective learning approaches 
              that ensure biology is taught in an updated, interactive, and efficient 
              manner. Through well-structured content and engaging formats, the platform 
              makes scientific learning more accessible and meaningful for students.
            </p>
            <Button
              variant="default"
              className="text-white px-6 py-5 rounded-md shadow-lg hover:scale-105 transition-transform duration-300"
              style={{
                backgroundColor: "#163409",
              }}
            >
              Explore Our Content
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FirstContentSection;