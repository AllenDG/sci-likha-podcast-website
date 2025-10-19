import CTASection from "./components/CTASection";
import EpisodeSection from "./components/EpisodeSection";
import GallerySection from "./components/GallerySection";

const ContentPage = () => {
  return (
    <div className="min-h-screen">
      <GallerySection />
      <EpisodeSection />
      <CTASection />
    </div>
  );
};

export default ContentPage;
