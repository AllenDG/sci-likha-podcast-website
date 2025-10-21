import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { crud } from "../../../../../api/index"; // adjust path
import { AxiosError } from "axios";

interface ContentPost {
  id: number;
  title: string | null;
  category: string | null;
  content: string | null;
  created_at: string;
  description: string | null;
}

const LatestVideo = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [videos, setVideos] = useState<ContentPost[]>([]);

  const fetchVideos = async () => {
    try {
      const response = await crud.get<ContentPost[]>("/v1/content/get-all-contents");
      const posts = response || [];

      // Sort by created_at descending and take latest 4
      const latestPosts = posts
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 4);

      setVideos(latestPosts);
    } catch (err) {
      const axiosError = err as AxiosError<{ message?: string }>;
      console.error(axiosError.response?.data.message || axiosError.message);
    }
  };

  useEffect(() => {
    fetchVideos();
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
                  {/* Thumbnail */}
                  <div className="aspect-video bg-white/20 backdrop-blur-sm flex items-center justify-center border-b border-white/20 rounded-lg overflow-hidden">
                    <img
                      src={getVideoThumbnail(video.content ?? undefined)}
                      alt={video.title ?? "Video Thumbnail"}
                      className="object-cover w-full h-full"
                      loading="lazy"
                      onError={(e) => {
                        // fallback if thumbnail fails
                        (e.currentTarget as HTMLImageElement).src = "/default-video-thumbnail.jpg";
                      }}
                    />
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
                    {video.created_at}
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
