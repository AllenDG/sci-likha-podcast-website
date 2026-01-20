/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import catherine from "@/assets/images/d446e5d1-a51d-4782-a36a-4601493beec7.jpg";
import cjay from "@/assets/images/2b66ade8-2655-44c2-9d3d-7337b519f496.jpg";
import ram from "@/assets/images/305772a6-ef88-4052-af1a-a009b95d1ec6.jpg";
import venice from "@/assets/images/9d7d9d5c-3510-4245-860e-83f0e9d9140a.jpg";

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
      image: catherine,
    },
    {
      name: "Cjay Sarmiento",
      role: "Host",
      image: cjay,
    },
    {
      name: "Ramm Angelo Poblete",
      role: "Editor & Host",
      image: ram,
    },
    {
      name: "Venice Lajato",
      role: "Technical Producer & Host",
      image: venice,
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