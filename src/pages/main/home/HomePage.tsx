import { useEffect, useState } from "react";
import CTA from "./components/CTA";
import HeroPage from "./components/HeroPage";
import InformationPage from "./components/InformationPage";
import LatestVideo from "./components/LatestVideo";
import { crud } from "../../../../api/index"; // adjust path
import { AxiosError } from "axios";

interface ContentPost {
  id: number;
  title: string | null;
  category: string | null;
  content: string | null;
  created_at: string;
  description: string | null;
}

const HomePage = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    
    // IIFE to fetch videos immediately
    (async () => {
      try {
        const response = await crud.get<ContentPost[]>("/v1/content/get-all-contents");
        const posts = response || [];

        // Sort by created_at descending and take latest 4
        const latestPosts = posts
          .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
          .slice(0, 4);

        if (latestPosts.length > 0) {
          localStorage.setItem("latestVideos", JSON.stringify(latestPosts));
          localStorage.setItem("latestVideo", JSON.stringify(latestPosts[0]));
        }

        console.log("Fetched and stored latest videos in localStorage.");
      } catch (err) {
        const axiosError = err as AxiosError<{ message?: string }>;
        console.error(axiosError.response?.data.message || axiosError.message);
      }
    })();

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Color (Red) */}
      <div
        className="fixed inset-0 w-full h-full -z-10"
        style={{
          transform: `translate3d(0, ${scrollY * 0.5}px, 0)`,
          willChange: "transform",
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <HeroPage scrollY={scrollY} />
        <InformationPage />
        <LatestVideo />
        <CTA />
      </div>
    </div>
  );
};

export default HomePage;
