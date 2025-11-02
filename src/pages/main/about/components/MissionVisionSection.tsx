import { useEffect, useRef, useState } from "react";
import { Dna, Microscope, Atom, Leaf } from "lucide-react";

const MissionVisionSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const topics = [
    {
      icon: Dna,
      title: "Selyula 101 — Overview of the Beginning of Life",
      description:
        "Alamin ang pinagmulan ng mga selula at kung paano nagsimula ang buhay. Tuklasin din ang mga siyentipikong nagbigay-linaw sa mga teoryang bumuo sa ating pag-unawa tungkol sa buhay.",
    },
    {
      icon: Microscope,
      title: "SelTalk — Parts and Functions of the Cell",
      description:
        "Talakayin ang iba't ibang bahagi ng selula at ang kani-kanilang mahahalagang tungkulin sa pagpapanatili ng buhay at kalusugan ng mga organismo.",
    },
    {
      icon: Atom,
      title: "Microscope Diaries — Plasma Membrane and Animal Cell Parts",
      description:
        "Suriin ang papel ng plasma membrane bilang tagapangalaga ng selula at tuklasin ang mga pangunahing bahagi ng animal cell na gumagawa ng bawat proseso ng buhay.",
    },
    {
      icon: Leaf,
      title: "Likas na Selyula — Cell Cycle and Cell Division",
      description:
        "Unawain ang pagkakasunod-sunod ng mga pangyayari sa loob ng isang selula na nagreresulta sa paghahati nito—isang mahalagang proseso para sa paglaki at pagpapanibago ng buhay.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-20 px-4 text-white overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
            Episodes Overview
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto drop-shadow">
            Tuklasin ang apat na kapana-panabik na episodes ng Sci-Likha na
            naglalayong palawakin ang iyong pag-unawa sa pinagmulan, istruktura,
            at siklo ng buhay ng mga selula.
          </p>
        </div>

        {/* Topics Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {topics.map((topic, index) => (
            <div
              key={index}
              className={`group transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl hover:shadow-2xl hover:bg-white/15 transition-all duration-300 hover:-translate-y-2 h-full border border-white/20">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <topic.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 drop-shadow">
                  {topic.title}
                </h3>
                <p className="text-white/90 leading-relaxed drop-shadow">
                  {topic.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionVisionSection;
