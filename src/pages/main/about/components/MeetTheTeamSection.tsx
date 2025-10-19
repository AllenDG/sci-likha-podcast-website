import { useEffect, useRef, useState } from "react";
import { Linkedin, Mail } from "lucide-react";

const MeetTheTeamSection = () => {
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

  const teamMembers = [
    {
      name: "Catherine Castillano",
      role: "Lead Researcher & Host",
      image: "/assets/images/team/catherine.jpg",
    },
    {
      name: "Cjay Sarmiento",
      role: "Content Creator & Editor",
      image: "/assets/images/team/cjay.jpg",
    },
    {
      name: "Ramm Angelo Poblete",
      role: "Technical Producer",
      image: "/assets/images/team/ramm.jpg",
    },
    {
      name: "Venice Lajato",
      role: "Community Manager",
      image: "/assets/images/team/venice.jpg",
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
            Meet The Team
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto drop-shadow">
            The passionate individuals behind Sci-Likha, dedicated to bringing
            you the best in science education.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className={`group transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:bg-white/15 transition-all duration-300 hover:-translate-y-2 border border-white/20">
                {/* Avatar */}
                <div className="aspect-square bg-white/20 backdrop-blur-sm relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg border-2 border-white/40">
                      <span className="text-5xl font-bold text-white drop-shadow-lg">
                        {member.name.charAt(0)}
                      </span>
                    </div>
                  </div>

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                    <div className="flex gap-3">
                      <a
                        href="#"
                        className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors border border-white/30"
                        aria-label="LinkedIn"
                      >
                        <Linkedin className="w-5 h-5 text-white" />
                      </a>
                      <a
                        href="#"
                        className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors border border-white/30"
                        aria-label="Email"
                      >
                        <Mail className="w-5 h-5 text-white" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-1 drop-shadow">
                    {member.name}
                  </h3>
                  <p className="text-white/80 text-sm drop-shadow">
                    {member.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetTheTeamSection;
