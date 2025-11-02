import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { Headphones, BookOpen, Share2 } from "lucide-react";
import { crud } from "../../../../../api/index";
import { AxiosError } from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const CTASection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [email, setEmail] = useState("");
  const [openModal, setOpenModal] = useState(false);

  // 🧬 Catherine Episodes List
  const episodes = [
    {
      id: 1,
      title: "EP1 - Selyula 101 — Overview of the Beginning of Life",
      description:
        "Ang episode na ito ay ginawa upang mas maunawaan ninyo ang pinagmulan ng mga selula, kung paano nagsimula ang buhay, at kung sinu-sino ang mga siyentipikong nasa likod ng teoryang ito.",
      details:
        "Duration: 25 minutes | Release Date: October 1, 2025 | Host: Catherine",
    },
    {
      id: 2,
      title: "EP2 - SelTalk — Parts and Functions of the Cell",
      description:
        "Sa episode na ito, ating aalamin ang iba’t ibang bahagi ng selula at ang kani-kaniyang mahahalagang tungkulin.",
      details:
        "Duration: 26 minutes | Release Date: October 8, 2025 | Host: Catherine",
    },
    {
      id: 3,
      title: "EP3 - Microscope Diaries — Plasma Membrane and Animal Cell Parts",
      description:
        "Sa episode na ito, pag-uusapan natin ang papel ng plasma membrane at ang mga pangunahing bahagi ng animal cell.",
      details:
        "Duration: 28 minutes | Release Date: October 15, 2025 | Host: Catherine",
    },
    {
      id: 4,
      title: "EP4 - Likas na Selyula — Cell Cycle and Cell Division",
      description:
        "Ang episode na ito ay ginawa upang mas maunawaan ninyo ang pagkakasunod-sunod ng mga pangyayari sa loob ng isang selula na nauuwi sa paghahati nito.",
      details:
        "Duration: 30 minutes | Release Date: October 22, 2025 | Host: Catherine",
    },
  ];

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

  const handleSubscribe = async () => {
    if (!email) return alert("Please enter your email.");
    try {
      await crud.create("/v1/registered-emails/register", { email });
      localStorage.setItem("subscribedEmail", email);
      alert("Subscribed successfully!");
      setEmail("");
    } catch (err) {
      const axiosError = err as AxiosError<{ message?: string }>;
      alert(
        axiosError.response?.data.message ||
          "Something went wrong. Please try again."
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
                onClick={() => setOpenModal(true)}
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

      {/* 🎧 Enhanced Modal for All Episodes */}
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className="max-w-4xl bg-gradient-to-b from-[#163409] to-[#0f2307] text-white border border-white/20 rounded-2xl shadow-2xl p-8">
          <DialogHeader className="text-center">
            <DialogTitle className="text-3xl font-bold text-white mb-2 tracking-wide">
              All Episodes
            </DialogTitle>
            <DialogDescription className="text-white/70 text-base max-w-2xl mx-auto">
              Explore Catherine’s complete Sci-Likha podcast series and dive
              deeper into the wonders of cell biology.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6 max-h-[60vh] overflow-y-auto pr-2">
            <Accordion
              type="single"
              collapsible
              className="space-y-3 [&>div]:bg-white/5 [&>div]:backdrop-blur-sm [&>div]:border-white/20 [&>div]:rounded-xl"
            >
              {episodes.map((ep) => (
                <AccordionItem key={ep.id} value={`item-${ep.id}`}>
                  <AccordionTrigger className="text-left text-lg font-semibold text-white px-5 py-3 hover:bg-white/10 rounded-t-xl transition-colors">
                    {ep.title}
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pb-5 text-white/80 leading-relaxed">
                    <p className="mb-2 text-base">{ep.description}</p>
                    <p className="text-sm italic text-white/60">{ep.details}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="flex justify-end mt-6">
            <Button
              onClick={() => setOpenModal(false)}
              className="text-white px-6 py-2 rounded-lg hover:scale-105 transition-transform duration-300 shadow-md"
              style={{ backgroundColor: "#1b4411" }}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default CTASection;
