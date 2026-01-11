import { useEffect, useRef, useState } from "react";
import { BookOpen, Search, Bell, FileText } from "lucide-react";

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
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const features = [
    {
      icon: BookOpen,
      title: "Four Educational Episodes",
      description:
        "The Sci-Likha Podcast features four educational episodes that focus on key concepts in evolution. Each episode presents well-structured discussions designed to explain complex biological ideas clearly and engagingly.",
    },
    {
      icon: Bell,
      title: "Subscribe for Updates",
      description:
        "The website allows users to subscribe to the Sci-Likha Podcast channel to receive notifications whenever new episodes are released. This ensures listeners remain updated with the latest educational content.",
    },
    {
      icon: Search,
      title: "Easy Episode Discovery",
      description:
        "The Content Page provides episode highlights, helping users easily identify topics they are interested in. A built-in search bar enables users to quickly find specific episodes they wish to watch or listen to.",
    },
    {
      icon: FileText,
      title: "Episode Overviews",
      description:
        "Each episode includes a brief overview that explains the topic and flow of the discussion, allowing users to prepare before viewing. This organized approach helps students explore biology in a guided way.",
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
            Platform Features
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto drop-shadow">
            Discover how Sci-Likha makes evolutionary biology accessible and 
            engaging through structured content and user-friendly features.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
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
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 drop-shadow">
                  {feature.title}
                </h3>
                <p className="text-white/90 leading-relaxed drop-shadow">
                  {feature.description}
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