import { useEffect, useState } from "react";
import CTA from "./components/CTA";
import HeroPage from "./components/HeroPage";
import InformationPage from "./components/InformationPage";
import LatestVideo from "./components/LatestVideo";

const HomePage = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Color */}
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