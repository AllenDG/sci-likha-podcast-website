import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Headphones, BookOpen } from "lucide-react";

const CTASection = () => {
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 px-4 text-white overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Main CTA Card */}
        <div
          className={`bg-white/10 backdrop-blur-md rounded-3xl p-12 md:p-16 shadow-2xl mb-12 border border-white/20 transition-all duration-1000 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">
              Join Our Learning Journey
            </h2>
            <p className="text-white/90 text-xl leading-relaxed mb-8 drop-shadow">
              Subscribe to Sci-Likha Podcast and embark on an educational
              adventure through the fascinating world of biology. New episodes
              every week!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="text-white px-10 py-7 rounded-xl shadow-lg text-lg hover:scale-105 transition-transform duration-300"
                style={{ backgroundColor: "#163409" }}
              >
                <Headphones className="w-6 h-6 mr-2" />
                Listen Now
              </Button>
              <Button
                size="lg"
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border-2 border-white/40 text-white px-10 py-7 rounded-xl shadow-lg text-lg hover:scale-105 transition-transform duration-300"
              >
                <BookOpen className="w-6 h-6 mr-2" />
                View Episodes
              </Button>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div
          className={`bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-white mb-4 drop-shadow">
              Stay Connected
            </h3>
            <p className="text-white/90 mb-6 drop-shadow">
              Subscribe to our newsletter for episode updates, biology facts,
              and exclusive content.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-5 py-4 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 text-lg"
              />
              <Button
                className="text-white px-8 py-4 rounded-xl shadow-md hover:scale-105 transition-transform duration-300 text-lg whitespace-nowrap"
                style={{ backgroundColor: "#163409" }}
              >
                Subscribe
              </Button>
            </div>
            <p className="text-xs text-white/70 mt-4 drop-shadow">
              Join thousands of subscribers. No spam, unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
