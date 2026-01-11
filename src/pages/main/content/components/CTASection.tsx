import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { Headphones, BookOpen, Share2 } from "lucide-react";

const CTASection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [email, setEmail] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const episodes = [
    {
      id: 1,
      title: "EP1 - Ang Ebolusyon ng Anyong-Buhay sa Kasaysayan ng Mundo",
      description:
        "Sa episodyo na ito, ating mapapakinggan ang talakayan patungkol sa kasaysayan at sinaunang takbo ng buhay mula noon hanggang ngayon sa ating napakalawak at napakatagal na mundo.",
      details:
        "Duration: 25 minutes | Release Date: Enero 20, 2025",
    },
    {
      id: 2,
      title: "EP2 - Ang Mekanismo ng Ebolusyon: Paghubog ng Buhay sa Bawat Nilalang",
      description:
        "Sa episodyo na ito, ating mapapakinggan ang talakayan patungkol sa limang magkakaibang uri ng mekanismo ng ebolusyon.",
      details:
        "Duration: 26 minutes | Release Date: Enero 25, 2025",
    },
    {
      id: 3,
      title: "EP3 - Mga Bakas ng Pagbabago: Ang Ebolusyon ng Buhay Mula sa mga Ninuno",
      description:
        "Sa episodyo na ito, ating mapapakinggan ang talakayan patungkol sa descent with modification at mga uri ng structures.",
      details:
        "Duration: 28 minutes | Release Date: Enero 30, 2025",
    },
    {
      id: 4,
      title: "EP4 - Evolution 101: Ang Kasaysayan ng Ebolusyon",
      description:
        "Sa episodyo na ito, ating mapapakinggan ang talakayan patungkol sa fixity belief at mga siyentipiko na nasa likod ng mga teoryang ito.",
      details:
        "Duration: 30 minutes | Release Date: Pebrero 5, 2025",
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

  const handleSubscribe = () => {
    if (!email) return alert("Mangyaring ilagay ang iyong email.");
    alert("Nag-subscribe ka na!");
    setEmail("");
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
              Manatiling Updated sa Sci-Likha
            </h2>
            <p className="text-white/90 text-lg mb-8 leading-relaxed drop-shadow">
              Mag-subscribe sa aming podcast at huwag palampasin ang mga bagong 
              episodes. Makatanggap ng notification kapag may bago kaming content 
              tungkol sa ebolusyon, agham, at kalikasan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="text-white px-8 py-6 rounded-md shadow-lg text-base hover:scale-105 transition-transform duration-300"
                style={{ backgroundColor: "#163409" }}
              >
                <Headphones className="w-5 h-5 mr-2" />
                Mag-subscribe Ngayon
              </Button>
              <Button
                size="lg"
                onClick={() => setOpenModal(true)}
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border-2 border-white/40 text-white px-8 py-6 rounded-md shadow-lg text-base hover:scale-105 transition-transform duration-300"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Tingnan ang Lahat ng Episodes
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
              title: "Mag-subscribe",
              description: "Makatanggap ng notification sa bagong episodes",
            },
            {
              icon: Share2,
              title: "Ibahagi",
              description: "Ikalat ang pagmamahal sa agham",
            },
            {
              icon: BookOpen,
              title: "Matuto",
              description: "Palawakin ang iyong kaalaman araw-araw",
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
              Sumali sa Aming Newsletter
            </h3>
            <p className="text-white/80 mb-6 drop-shadow">
              Makatanggap ng lingguhang updates, episode highlights, at eksklusibong 
              content sa iyong inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Ilagay ang iyong email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50"
              />
              <Button
                onClick={handleSubscribe}
                className="text-white px-6 py-3 rounded-lg shadow-md hover:scale-105 transition-transform duration-300 whitespace-nowrap"
                style={{ backgroundColor: "#163409" }}
              >
                Mag-subscribe
              </Button>
            </div>
            <p className="text-xs text-white/70 mt-3 drop-shadow">
              Ginagalang namin ang iyong privacy. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>

      {/* Modal for Episodes */}
      {openModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-[9999] p-4">
          <div className="bg-gradient-to-b from-[#163409] to-[#0f2307] text-white border border-white/20 rounded-2xl shadow-2xl p-8 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-white mb-2 tracking-wide">
                Lahat ng Episodes
              </h2>
              <p className="text-white/70 text-base max-w-2xl mx-auto">
                Tuklasin ang kumpletong Sci-Likha podcast series at sumisid sa 
                kahanga-hangang mundo ng ebolusyon.
              </p>
            </div>

            <div className="space-y-4">
              {episodes.map((ep) => (
                <div
                  key={ep.id}
                  className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-5"
                >
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {ep.title}
                  </h3>
                  <p className="text-white/80 text-sm mb-2 leading-relaxed">
                    {ep.description}
                  </p>
                  <p className="text-white/60 text-xs italic">{ep.details}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-end mt-6">
              <Button
                onClick={() => setOpenModal(false)}
                className="text-white px-6 py-2 rounded-lg hover:scale-105 transition-transform duration-300 shadow-md"
                style={{ backgroundColor: "#1b4411" }}
              >
                Isara
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CTASection;