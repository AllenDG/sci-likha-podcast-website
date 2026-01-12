/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import ep1Thumbnail from "@/assets/images/sci-likha-ep-1.jpg";
import ep2Thumbnail from "@/assets/images/sci-likha-ep-2.jpg";
import ep3Thumbnail from "@/assets/images/sci-likha-ep-3.jpg";
import ep4Thumbnail from "@/assets/images/sci-likha-ep-4.jpg";

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
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const teamMembers = [
    {
      name: "Catherine Castillano",
      role: "Lead Researcher & Host",
      image: ep1Thumbnail,
    },
    {
      name: "Cjay Sarmiento",
      role: "Host",
      image: ep2Thumbnail,
    },
    {
      name: "Ramm Angelo Poblete",
      role: "Editor & Host",
      image: ep3Thumbnail,
    },
    {
      name: "Venice Lajato",
      role: "Technical Producer & Host",
      image: ep4Thumbnail,
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
                {/* Avatar with image */}
                <div className="aspect-square bg-white/10 relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                {/* Content */}
                <div className="p-6 text-center">
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