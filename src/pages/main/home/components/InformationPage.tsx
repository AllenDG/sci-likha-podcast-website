import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

interface ContentPost {
  id: number;
  title: string | null;
  category: string | null;
  content: string | null;
  created_at: string;
  description: string | null;
  created_by: string | null;
}

const InformationPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [video, setVideo] = useState<ContentPost | null>(null);

  useEffect(() => {

    // Load from localStorage first
    const savedVideo = localStorage.getItem("latestVideo");
    if (savedVideo) {
      const parsedVideo: ContentPost = JSON.parse(savedVideo);
      setVideo(parsedVideo);
    }

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

  function getVideoThumbnail(url: string | undefined) {
    if (!url) return "/default-video-thumbnail.jpg";

    // YouTube
    const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=)([\w-]+)/);
    if (ytMatch) return `https://img.youtube.com/vi/${ytMatch[1]}/hqdefault.jpg`;

    // Google Drive
    const gdMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (gdMatch) return `https://drive.google.com/uc?export=thumbnail&id=${gdMatch[1]}`;

    // OneDrive (simplified, best-effort)
    if (url.includes("1drv.ms") || url.includes("onedrive.live.com")) {
      return url; // OneDrive thumbnail extraction is limited on frontend
    }

    // fallback
    return "/default-video-thumbnail.jpg";
  }

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
                {/* Thumbnail */}
                  <div className="aspect-video bg-white/20 backdrop-blur-sm flex items-center justify-center border-b border-white/20 rounded-lg overflow-hidden">
                    <img
                      src={getVideoThumbnail(video?.content ?? undefined)}
                      alt={video?.title ?? "Video Thumbnail"}
                      className="object-cover w-full h-full"
                      loading="lazy"
                      onError={(e) => {
                        // fallback if thumbnail fails
                        (e.currentTarget as HTMLImageElement).src = "/default-video-thumbnail.jpg";
                      }}
                    />
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
              {video?.title ?? "--"}
            </h2>
            <p className="text-white/90 mb-4 leading-relaxed drop-shadow">
              {video?.description ?? "--"}
            </p>
            <p className="text-white/80 text-sm mb-6 drop-shadow">
              By {video?.created_by ?? 'Sci Likha Team'} • Updated Weekly
            </p>
            <Button
              variant="default"
              className="text-white px-6 py-5 rounded-md shadow-lg hover:scale-105 transition-transform duration-300"
              style={{ backgroundColor: "#163409" }}
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
