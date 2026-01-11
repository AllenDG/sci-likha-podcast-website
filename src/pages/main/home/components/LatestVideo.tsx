import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { Play, Pause, Music } from "lucide-react";

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
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(
    null
  );
  const [nowPlaying, setNowPlaying] = useState<EpisodeData | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const stopTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const handlePlay = (episode: EpisodeData) => {
    if (!episode.content) {
      alert("Audio file not available yet. Coming soon!");
      return;
    }

    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
    if (stopTimerRef.current) clearTimeout(stopTimerRef.current);

    const audio = new Audio(episode.content);

    audio.ontimeupdate = () => setCurrentTime(audio.currentTime);
    audio.onloadedmetadata = () => setDuration(audio.duration);

    audio
      .play()
      .then(() => {
        // No auto-stop timer, let the audio play fully
      })
      .catch((error) => {
        console.error("Playback failed:", error);
        alert(`Playback failed: ${error.message}`);
        setIsPlaying(false);
        setNowPlaying(null);
      });

    audio.onended = () => {
      if (stopTimerRef.current) clearTimeout(stopTimerRef.current);
      setIsPlaying(false);
      setNowPlaying(null);
      setCurrentTime(0);
    };

    setCurrentAudio(audio);
    setNowPlaying(episode);
    setIsPlaying(true);
    setCurrentTime(0);
  };

  const togglePlayback = () => {
    if (!currentAudio) return;
    if (isPlaying) currentAudio.pause();
    else currentAudio.play();
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time: number) => {
    if (!isFinite(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
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
              <Card className="overflow-hidden shadow-lg border border-white/20 bg-white/10 backdrop-blur-md hover:shadow-2xl hover:bg-white/15 transition-all duration-300 hover:-translate-y-2 h-full">
                <CardContent className="p-0">
                  <div className="aspect-video relative overflow-hidden border-b border-white/20">
                    <img
                      src={episode.thumbnail}
                      alt={episode.title}
                      className="w-full h-full object-cover"
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
                  <Button
                    onClick={() => handlePlay(episode)}
                    variant="default"
                    size="sm"
                    className="w-full mt-2 text-white rounded-md hover:scale-105 transition-transform duration-300"
                    style={{ backgroundColor: "#163409" }}
                  >
                    ▶ Pakinggan
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* NOW PLAYING DOCK */}
      {nowPlaying && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-[95%] md:w-[650px] lg:w-[700px] bg-gradient-to-r from-white/15 to-white/10 backdrop-blur-xl rounded-2xl border border-white/30 shadow-2xl flex flex-col px-6 py-4 text-white z-[9999] transition-all hover:shadow-3xl">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-blue-300/20 rounded-full flex items-center justify-center">
                <Music className="text-green-800" size={22} />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] text-white/60 uppercase tracking-wide">
                  Kasalukuyang Tumutugtog
                </span>
                <h4 className="text-sm font-semibold truncate max-w-[240px] md:max-w-[340px]">
                  {nowPlaying.title}
                </h4>
              </div>
            </div>
            <Button
              onClick={togglePlayback}
              className="rounded-full w-10 h-10 flex items-center justify-center text-white bg-green-900 hover:bg-green-600 transition"
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </Button>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex justify-between text-xs text-white/60">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>

            <div className="relative w-full h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-600 to-green-800 transition-all duration-300"
                style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default LatestVideo;