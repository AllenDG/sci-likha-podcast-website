import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { Headphones, BookOpen, Share2 } from "lucide-react";
import { crud } from "../../../../../api/index"; // make sure this path is correct
import { AxiosError } from "axios";

const CTASection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [email, setEmail] = useState("");

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

  const handleSubscribe = async () => {
    if (!email) return alert("Please enter your email.");

    try {
      await crud.create("/v1/registered-emails/register", { email });
      localStorage.setItem("subscribedEmail", email);
      alert("Subscribed successfully!");
      setEmail(""); // clear input
    } catch (err) {
      const axiosError = err as AxiosError<{ message?: string }>;
      alert(
        axiosError.response?.data.message || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-20 px-4 text-white overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* CTA Card */}
        <div
          className={`bg-white/10 backdrop-blur-md rounded-2xl p-12 md:p-16 shadow-2xl border border-white/20 transition-all duration-1000 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
              Stay Updated with Sci-Likha
            </h2>
            <p className="text-white/90 text-lg mb-8 leading-relaxed drop-shadow">
              Subscribe to our podcast and never miss an episode. Get notified
              when we release new content exploring the wonders of science,
              nature, and innovation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="text-white px-8 py-6 rounded-md shadow-lg text-base hover:scale-105 transition-transform duration-300"
                style={{ backgroundColor: "#163409" }}
              >
                <Headphones className="w-5 h-5 mr-2" />
                Subscribe Now
              </Button>
              <Button
                size="lg"
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border-2 border-white/40 text-white px-8 py-6 rounded-md shadow-lg text-base hover:scale-105 transition-transform duration-300"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                View All Episodes
              </Button>
            </div>
          </div>
        </div>

        {/* Action Cards */}
        <div
          className={`grid md:grid-cols-3 gap-6 mt-12 mb-12 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {[
            {
              icon: Headphones,
              title: "Subscribe",
              description: "Get notified about new episodes",
            },
            {
              icon: Share2,
              title: "Share",
              description: "Spread the love of science",
            },
            {
              icon: BookOpen,
              title: "Learn",
              description: "Expand your knowledge daily",
            },
          ].map((action, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center shadow-lg hover:shadow-xl hover:bg-white/15 transition-all duration-300 hover:-translate-y-2 cursor-pointer border border-white/20"
            >
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg border border-white/30">
                <action.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 drop-shadow">
                {action.title}
              </h3>
              <p className="text-white/80 drop-shadow">{action.description}</p>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div
          className={`bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-lg border border-white/20 transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-white mb-4 drop-shadow">
              Join Our Newsletter
            </h3>
            <p className="text-white/80 mb-6 drop-shadow">
              Get weekly updates, episode highlights, and exclusive content
              delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50"
              />
              <Button
                onClick={handleSubscribe}
                className="text-white px-6 py-3 rounded-lg shadow-md hover:scale-105 transition-transform duration-300 whitespace-nowrap"
                style={{ backgroundColor: "#163409" }}
              >
                Subscribe
              </Button>
            </div>
            <p className="text-xs text-white/70 mt-3 drop-shadow">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>

        
      </div>
    </section>
  );
};

export default CTASection;
