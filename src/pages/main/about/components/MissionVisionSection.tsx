import { useEffect, useRef, useState } from "react";
import { Dna, Sun, Microscope, Leaf } from "lucide-react";

const MissionVisionSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const topics = [
    {
      icon: Dna,
      title: "Cell Biology",
      description:
        "Explore cells—the smallest units of life—from prokaryotes to eukaryotes, understanding their structures and metabolic functions.",
    },
    {
      icon: Sun,
      title: "Photosynthesis",
      description:
        "Discover how plants convert light energy into chemical bonds, producing sugars and oxygen through light-dependent and independent reactions.",
    },
    {
      icon: Microscope,
      title: "Energy & Metabolism",
      description:
        "Learn about aerobic respiration, glycolysis, and how organisms harvest energy from molecules through enzyme-mediated reactions.",
    },
    {
      icon: Leaf,
      title: "Biodiversity",
      description:
        "Understand Earth's incredible variety of life, from bacteria and archaea to complex multicellular organisms across all kingdoms.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-20 px-4 text-white overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
            What We Cover
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto drop-shadow">
            From molecular biology to ecosystems, explore the fascinating world
            of life sciences.
          </p>
        </div>

        {/* Topics Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {topics.map((topic, index) => (
            <div
              key={index}
              className={`group transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl hover:shadow-2xl hover:bg-white/15 transition-all duration-300 hover:-translate-y-2 h-full border border-white/20">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <topic.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 drop-shadow">
                  {topic.title}
                </h3>
                <p className="text-white/90 leading-relaxed drop-shadow">
                  {topic.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionVisionSection;
