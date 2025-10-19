import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

const LatestVideo = () => {
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

  const videos = [
    {
      id: 1,
      title: "Introduction to Cell Biology",
      category: "Cell Biology",
      date: "October 15, 2025",
    },
    {
      id: 2,
      title: "Photosynthesis Explained",
      category: "Plant Biology",
      date: "October 12, 2025",
    },
    {
      id: 3,
      title: "Energy and Metabolism",
      category: "Biochemistry",
      date: "October 10, 2025",
    },
    {
      id: 4,
      title: "Understanding Biodiversity",
      category: "Ecology",
      date: "October 8, 2025",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-20 px-4 text-white overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <div
          className={`mb-12 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
            Latest Video
          </h2>
          <div className="w-24 h-1 bg-white/50 mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
              <Card className="overflow-hidden shadow-lg border border-white/20 bg-white/10 backdrop-blur-md hover:shadow-2xl hover:bg-white/15 transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-0">
                  <div className="aspect-video bg-white/20 backdrop-blur-sm flex items-center justify-center group cursor-pointer border-b border-white/20">
                    <div className="w-16 h-16 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg border border-white/40">
                      <svg
                        className="w-8 h-8 text-white ml-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col items-start p-4 gap-2">
                  <p className="text-xs text-white/70 uppercase tracking-wide drop-shadow">
                    {video.category}
                  </p>
                  <h3 className="text-sm font-semibold text-white line-clamp-2 drop-shadow">
                    {video.title}
                  </h3>
                  <p className="text-xs text-white/60 drop-shadow">
                    {video.date}
                  </p>
                  <Button
                    variant="default"
                    size="sm"
                    className="w-full mt-2 text-white rounded-md hover:scale-105 transition-transform duration-300"
                    style={{ backgroundColor: "#163409" }}
                  >
                    Learn More
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestVideo;
