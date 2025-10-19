import CTASection from "./components/CTASectiom";
import FirstContentSection from "./components/FirstContentSection";
import HeroSection from "./components/HeroSection";
import MeetTheTeamSection from "./components/MeetTheTeamSection";
import MissionVisionSection from "./components/MissionVisionSection";
import SecondContentSection from "./components/SecondContentSection";

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FirstContentSection />
      <SecondContentSection />
      <MissionVisionSection />
      <MeetTheTeamSection />
      <CTASection />
    </div>
  );
};

export default AboutPage;
