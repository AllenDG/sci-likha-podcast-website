import { useEffect, useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Headphones, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

/**
 * Call-to-Action section for About page
 * Provides navigation to podcast content and episode information
 */
const CTASection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  // Intersection observer for animation trigger
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

  // Navigate to content page
  const handleListenNow = useCallback(() => {
    navigate("/content");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [navigate]);

  // Navigate to content page (episodes section)
  const handleViewEpisodes = useCallback(() => {
    navigate("/content");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [navigate]);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-20 px-4 text-white overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Main CTA Card */}
        <div
          className={`bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl mb-8 md:mb-12 border border-white/20 transition-all duration-1000 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 drop-shadow-lg">
              Start Your Scientific Journey
            </h2>
            <p className="text-white/90 text-base md:text-lg leading-relaxed mb-6 md:mb-8 drop-shadow">
              Join Sci-Likha Podcast and explore evolutionary biology through 
              innovative learning approaches. Discover how scientific processes 
              define life with our four educational episodes.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <Button
                onClick={handleListenNow}
                size="lg"
                className="text-white px-6 md:px-10 py-3 md:py-4 rounded-xl shadow-lg text-sm md:text-base hover:scale-105 transition-transform duration-300 bg-[#163409] hover:bg-[#1b3e0d]"
                aria-label="Navigate to content page to listen to episodes"
              >
                <Headphones className="w-5 h-5 mr-2" />
                Listen Now
              </Button>
              <Button
                onClick={handleViewEpisodes}
                size="lg"
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border-2 border-white/40 text-white px-6 md:px-10 py-3 md:py-4 rounded-xl shadow-lg text-sm md:text-base hover:scale-105 transition-transform duration-300"
                aria-label="Navigate to content page to view all episodes"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                View Episodes
              </Button>
            </div>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div
          className={`bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-xl border border-white/20 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 drop-shadow">
              Stay Updated
            </h3>
            <p className="text-white/90 text-sm md:text-base mb-4 md:mb-6 drop-shadow">
              Subscribe to receive notifications about new episodes, evolutionary 
              biology insights, and exclusive educational content.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 md:px-5 py-3 md:py-4 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 text-sm md:text-base"
                aria-label="Email subscription input"
              />
              <Button
                className="text-white px-6 md:px-8 py-3 md:py-4 rounded-xl shadow-md hover:scale-105 transition-transform duration-300 text-sm md:text-base whitespace-nowrap bg-[#163409] hover:bg-[#1b3e0d]"
                aria-label="Subscribe to newsletter"
              >
                Subscribe
              </Button>
            </div>
            <p className="text-xs md:text-sm text-white/70 mt-3 md:mt-4 drop-shadow">
              Join our community of learners. No spam, unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;