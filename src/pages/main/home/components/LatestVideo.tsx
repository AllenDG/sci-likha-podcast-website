import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { CometCard } from "@/components/ui/comet-card";

const LatestVideo = () => {
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

  const videos = [
    {
      id: 1,
      title: "Understanding Plant Growth in Different Environments",
      category: "Biology • Education",
      date: "October 19, 2025",
    },
    {
      id: 2,
      title: "The Science of Photosynthesis Explained Simply",
      category: "Biology • Nature",
      date: "October 19, 2025",
    },
    {
      id: 3,
      title: "Exploring Human Anatomy — Systems and Functions",
      category: "Science • Anatomy",
      date: "October 19, 2025",
    },
    {
      id: 4,
      title: "Microorganisms and Their Role in Ecosystems",
      category: "Microbiology • Research",
      date: "October 19, 2025",
    },
  ];

  return (
    <section ref={sectionRef} className="relative py-24 px-4 overflow-hidden">
      {/* --- Frosted Green Glass Background --- */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(173, 231, 146, 0.4), rgba(137, 207, 129, 0.25), rgba(255, 255, 200, 0.2))",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
        }}
      />

      {/* --- Content --- */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div
          className={`mb-16 text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Latest Video
          </h2>
          <div className="mx-auto w-24 h-1 bg-[#163409] rounded-full" />
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {videos.map((video, index) => (
            <div
              key={video.id}
              className={`transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <CometCard className="rounded-2xl">
                <Card
                  className="overflow-hidden border-none bg-white/40 backdrop-blur-md shadow-lg hover:shadow-2xl rounded-2xl transition-all duration-300 hover:-translate-y-2"
                  style={{
                    border: "1px solid rgba(255,255,255,0.4)",
                  }}
                >
                  <CardContent className="p-0">
                    <div className="aspect-video bg-gradient-to-br from-lime-200/60 to-yellow-100/60 flex items-center justify-center group cursor-pointer">
                      <div className="w-16 h-16 bg-white/70 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
                        <svg
                          className="w-8 h-8 text-[#163409] ml-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col items-start p-5 gap-2">
                    <p className="text-xs text-gray-700 uppercase tracking-wide">
                      {video.category}
                    </p>
                    <h3 className="text-base font-semibold text-gray-900 line-clamp-2">
                      {video.title}
                    </h3>
                    <p className="text-xs text-gray-600">{video.date}</p>
                    <Button
                      variant="default"
                      size="sm"
                      className="w-full mt-3 bg-[#163409] hover:bg-[#1e4b0d] text-white rounded-md hover:scale-105 transition-transform duration-300"
                    >
                      Learn More
                    </Button>
                  </CardFooter>
                </Card>
              </CometCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestVideo;
