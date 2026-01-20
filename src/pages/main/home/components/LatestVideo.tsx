import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { Play, X } from "lucide-react";

import ep1Thumbnail from "@/assets/images/sci-likha-ep-1.jpg";
import ep2Thumbnail from "@/assets/images/sci-likha-ep-2.jpg";
import ep3Thumbnail from "@/assets/images/sci-likha-ep-3.jpg";
import ep4Thumbnail from "@/assets/images/sci-likha-ep-4.jpg";

import ep1Audio from "@/assets/others/EP_1_ANG_EBOLUSYON_NG_ANYONG-BUHAY_SA_KASAYSAYAN_NG_MUNDO.mp3";
import ep2Audio from "@/assets/others/EP_2_ANG_MEKANISMO_NG_EBOLUSYON_PAGHUBOG_NG_BUHAY_SA_BAWAT_NILALANG_SA_MUNDO.mp3";
import ep3Audio from "@/assets/others/EP_3_MGA_BAKAS_NG_PAGBABAGO__ANG_EBOLUSYON_NG_BUHAY_MULA_SA_MGA_NINUNO.mp3";
import ep4Audio from "@/assets/others/EP_4_EVOLUTION_101_ANG_KASAYSAYAN_NG_EBOLUSYON.mp3";

interface EpisodeData {
  id: number;
  episode_id: string;
  title: string;
  description: string;
  category: string;
  content: string;
  created_at: string;
  type: "episode";
  thumbnail: string;
}

const episodeData: EpisodeData[] = [
  {
    id: 1,
    episode_id: "EP001",
    title: "Ang Ebolusyon ng Anyong-Buhay sa Kasaysayan ng Mundo",
    description:
      "Tuklasin kung paano nag-evolve ang mga buhay na organismo mula sa simpleng porma hanggang sa mga komplikadong nilalang na umiiral ngayon.",
    category: "Evolution",
    content: ep1Audio,
    created_at: "Enero 2025",
    type: "episode",
    thumbnail: ep1Thumbnail,
  },
  {
    id: 2,
    episode_id: "EP002",
    title: "Ang Mekanismo ng Ebolusyon: Paghubog ng Buhay sa Bawat Nilalang",
    description:
      "Alamin ang mga mekanismo tulad ng natural selection, genetic drift, at mutation na humuhubog sa ebolusyon ng mga species.",
    category: "Evolution",
    content: ep2Audio,
    created_at: "Enero 2025",
    type: "episode",
    thumbnail: ep2Thumbnail,
  },
  {
    id: 3,
    episode_id: "EP003",
    title: "Mga Bakas ng Pagbabago: Ang Ebolusyon mula sa mga Ninuno",
    description:
      "Suriin ang mga ebidensya ng ebolusyon mula sa fossil records, comparative anatomy, at molecular biology na nagpapatunay ng pagbabago sa mga species.",
    category: "Evolution",
    content: ep3Audio,
    created_at: "Enero 2025",
    type: "episode",
    thumbnail: ep3Thumbnail,
  },
  {
    id: 4,
    episode_id: "EP004",
    title: "Evolution 101: Ang Kasaysayan ng Ebolusyon—Kung Saan ang Ideya ay Naging Buhay",
    description:
      "Kilalanin ang mga siyentipikong nag-ambag sa teorya ng ebolusyon, mula kay Charles Darwin hanggang sa mga modernong evolutionary biologists.",
    category: "Evolution",
    content: ep4Audio,
    created_at: "Enero 2025",
    type: "episode",
    thumbnail: ep4Thumbnail,
  },
];

const LatestVideo = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [episodes] = useState<EpisodeData[]>(episodeData);
  const [selectedEpisode, setSelectedEpisode] = useState<EpisodeData | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const handleCardClick = (episode: EpisodeData) => {
    setSelectedEpisode(episode);
    setShowModal(true);
    // Prevent background scrolling
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedEpisode(null);
    // Re-enable background scrolling
    document.body.style.overflow = 'unset';
  };

  const handlePlayRedirect = () => {
    // Redirect to content page where episodes are listed
    window.location.href = '/content';
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-20 px-4 text-white overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <div
          className={`mb-12 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
            Mga Pinakabagong Episodes
          </h2>
          <div className="w-24 h-1 bg-white/50 mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {episodes.map((episode, index) => (
            <div
              key={episode.id}
              className={`transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <Card 
                onClick={() => handleCardClick(episode)}
                className="overflow-hidden shadow-lg border border-white/20 bg-white/10 backdrop-blur-md hover:shadow-2xl hover:bg-white/15 transition-all duration-300 hover:-translate-y-2 h-full cursor-pointer"
              >
                <CardContent className="p-0">
                  <div className="aspect-video relative overflow-hidden border-b border-white/20">
                    <img
                      src={episode.thumbnail}
                      alt={episode.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-md">
                      <p className="text-xs text-white/90 font-semibold">
                        Episode {episode.id}
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col items-start p-4 gap-2">
                  <p className="text-xs text-white/70 uppercase tracking-wide drop-shadow">
                    {episode.category}
                  </p>
                  <h3 className="text-sm font-semibold text-white line-clamp-2 drop-shadow">
                    {episode.title}
                  </h3>
                  <p className="text-xs text-white/60 drop-shadow line-clamp-2">
                    {episode.description}
                  </p>
                  <p className="text-xs text-white/60 drop-shadow mt-1">
                    {episode.created_at}
                  </p>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Episode Detail Modal */}
      {showModal && selectedEpisode && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[9999] p-4">
          <div className="bg-gradient-to-br from-white/15 to-white/5 border border-white/30 backdrop-blur-xl rounded-3xl w-full max-w-4xl text-white relative shadow-2xl overflow-hidden">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 text-white/70 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all"
              title="Isara"
            >
              <X size={24} />
            </button>

            {/* Thumbnail */}
            <div className="relative w-full aspect-video">
              <img
                src={selectedEpisode.thumbnail}
                alt={selectedEpisode.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-black/60 backdrop-blur-sm px-4 py-2 rounded-lg inline-block">
                  <p className="text-white/90 font-semibold">Episode {selectedEpisode.id}</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="mb-4">
                <span className="px-3 py-1 bg-emerald-500/20 rounded-full text-emerald-300 text-xs font-semibold uppercase tracking-wide">
                  {selectedEpisode.category}
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                {selectedEpisode.title}
              </h2>

              <p className="text-white/80 text-base leading-relaxed mb-6">
                {selectedEpisode.description}
              </p>

              <p className="text-white/60 text-sm mb-8">
                {selectedEpisode.created_at}
              </p>

              {/* Action Button */}
              <Button
                onClick={handlePlayRedirect}
                size="lg"
                className="w-full md:w-auto text-white px-10 py-6 rounded-xl shadow-2xl text-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
                style={{ backgroundColor: "#163409" }}
              >
                <Play size={24} />
                Pumunta sa Episodes at Makinig
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default LatestVideo;