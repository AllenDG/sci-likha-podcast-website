import { useState, useMemo, useRef, useEffect } from "react";
import {
  Search,
  Music,
  Play,
  Pause,
  X,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  ExternalLink,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import ep1Thumbnail from "@/assets/images/sci-likha-ep-1.jpg";
import ep2Thumbnail from "@/assets/images/sci-likha-ep-2.jpg";
import ep3Thumbnail from "@/assets/images/sci-likha-ep-3.jpg";
import ep4Thumbnail from "@/assets/images/sci-likha-ep-4.jpg";

import ep1Audio from "@/assets/others/EP_1_ANG_EBOLUSYON_NG_ANYONG-BUHAY_SA_KASAYSAYAN_NG_MUNDO.mp3";
import ep2Audio from "@/assets/others/EP_2_ANG_MEKANISMO_NG_EBOLUSYON_PAGHUBOG_NG_BUHAY_SA_BAWAT_NILALANG_SA_MUNDO.mp3";
import ep3Audio from "@/assets/others/EP_3_MGA_BAKAS_NG_PAGBABAGO__ANG_EBOLUSYON_NG_BUHAY_MULA_SA_MGA_NINUNO.mp3";
import ep4Audio from "@/assets/others/EP_4_EVOLUTION_101_ANG_KASAYSAYAN_NG_EBOLUSYON.mp3";
interface Episode {
  id: number;
  title: string;
  description: string;
  category: string;
  content: string;
  date: string;
  assessmentLink: string;
  thumbnail: string;
}

const EpisodeSection = () => {
  const localEpisodes: Episode[] = [
    {
      id: 1,
      title: "EP 1 — Ang Ebolusyon ng Anyong-Buhay sa Kasaysayan ng Mundo",
      description:
        "Sa episodyo na ito, ating mapapakinggan ang talakayan patungkol sa kasaysayan at sinaunang takbo ng buhay...",
      category: "Evolution",
      content: ep1Audio,
      date: "2025-01-20",
      assessmentLink: "https://example.com/assessment/episode1",
      thumbnail: ep1Thumbnail,
    },
    {
      id: 2,
      title: "EP 2 — Ang Mekanismo ng Ebolusyon: Paghubog ng Buhay sa Bawat Nilalang",
      description:
        "Sa episodyo na ito, ating mapapakinggan ang talakayan patungkol sa limang magkakaibang uri ng mekanismo...",
      category: "Evolution",
      content: ep2Audio,
      date: "2025-01-25",
      assessmentLink: "https://example.com/assessment/episode2",
      thumbnail: ep2Thumbnail,
    },
    {
      id: 3,
      title: "EP 3 — Mga Bakas ng Pagbabago: Ang Ebolusyon ng Buhay Mula sa mga Ninuno",
      description:
        "Sa episodyo na ito, ating mapapakinggan ang talakayan patungkol sa descent with modification...",
      category: "Evolution",
      content: ep3Audio,
      date: "2025-01-30",
      assessmentLink: "https://example.com/assessment/episode3",
      thumbnail: ep3Thumbnail,
    },
    {
      id: 4,
      title:
        "EP 4 — Evolution 101: Ang Kasaysayan ng Ebolusyon—Kung Saan ang Ideya ay Naging Buhay",
      description:
        "Sa episodyo na ito, ating mapapakinggan ang talakayan patungkol sa fixity belief...",
      category: "Evolution",
      content: ep4Audio,
      date: "2025-02-05",
      assessmentLink: "https://example.com/assessment/episode4",
      thumbnail: ep4Thumbnail,
    },
  ];

  const [episodes] = useState(localEpisodes);
  const [searchQuery, setSearchQuery] = useState("");
  const [nowPlaying, setNowPlaying] = useState<Episode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(40);
  const [showModal, setShowModal] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [completedEpisodes, setCompletedEpisodes] = useState<number[]>([1]);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const savedProgress = useRef<Record<number, number>>({});

  const filteredEpisodes = useMemo(() => {
    if (!searchQuery) return episodes;
    
    return episodes.filter(
      (ep) =>
        ep.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ep.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [episodes, searchQuery]);

  const isEpisodeUnlocked = (episodeId: number) =>
    completedEpisodes.includes(episodeId);

  const handlePlay = (episode: Episode) => {
    if (!isEpisodeUnlocked(episode.id)) {
      alert(
        "Ang episode na ito ay naka-lock! Kumpletuhin ang assessment ng nakaraang episode upang i-unlock ito."
      );
      return;
    }

    if (!episode.content) {
      alert("Audio file ay hindi pa available. Coming soon!");
      return;
    }

    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
    }

    const newAudio = new Audio(episode.content);
    currentAudioRef.current = newAudio;
    setNowPlaying(episode);
    setIsPlaying(true);
    setShowModal(true);
    setMinimized(false);
    setDuration(40);

    const savedTime = savedProgress.current[episode.id] || 0;
    newAudio.currentTime = savedTime;

    newAudio.ontimeupdate = () => setCurrentTime(newAudio.currentTime);
    newAudio.onloadedmetadata = () => setDuration(newAudio.duration || 40);
    newAudio.onended = () => setIsPlaying(false);

    newAudio.play().catch((err) => console.error("Audio play failed:", err));
  };

  const togglePlayback = () => {
    if (!currentAudioRef.current) return;
    if (isPlaying) {
      currentAudioRef.current.pause();
    } else {
      currentAudioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleAssessment = (episode: Episode) => {
    window.open(episode.assessmentLink, "_blank");
    const nextEpisodeId = episode.id + 1;
    if (!completedEpisodes.includes(nextEpisodeId))
      setCompletedEpisodes([...completedEpisodes, nextEpisodeId]);
  };

  const closeModal = () => {
    if (currentAudioRef.current && nowPlaying) {
      savedProgress.current[nowPlaying.id] =
        currentAudioRef.current.currentTime;
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0;
    }
    setShowModal(false);
    setNowPlaying(null);
    setIsPlaying(false);
  };

  const formatTime = (time: number) => {
    if (!isFinite(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  const getProgressPercentage = () => {
    if (!duration || !isFinite(duration)) return 0;
    return (currentTime / duration) * 100;
  };

  useEffect(() => {
    return () => {
      if (currentAudioRef.current) currentAudioRef.current.pause();
    };
  }, []);

  return (
    <section className="relative py-20 px-4 text-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">
            Mga Episodes
          </h2>
          <div className="w-24 h-1 bg-white/50" />
        </div>

        {/* Search Bar - Full Width */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6 mb-8 border border-white/20">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
            <Input
              type="text"
              placeholder="Maghanap ng episodes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder:text-white/60 focus:ring-white/50 w-full"
            />
          </div>
        </div>

        {/* Episodes List - Vertical */}
        <div className="space-y-6">
          {filteredEpisodes.map((episode) => {
            const isUnlocked = isEpisodeUnlocked(episode.id);
            const isCompleted = completedEpisodes.includes(episode.id + 1);
            return (
              <Card
                key={episode.id}
                className={`overflow-hidden shadow-lg border transition-all duration-300 ${
                  isUnlocked
                    ? "border-white/20 bg-white/10 backdrop-blur-md hover:shadow-2xl hover:bg-white/15"
                    : "border-white/10 bg-white/5 backdrop-blur-sm opacity-60"
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* Thumbnail */}
                    <div className="w-full md:w-48 flex-shrink-0">
                      <img
                        src={episode.thumbnail}
                        alt={episode.title}
                        className="w-full h-auto rounded-lg shadow-lg border border-white/20 object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col md:flex-row justify-between md:items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-3 mb-3">
                          {isCompleted ? (
                            <CheckCircle className="text-green-400 flex-shrink-0 mt-1" size={24} />
                          ) : null}
                          <div className="flex-1">
                            <h3
                              className={`text-xl font-bold mb-2 ${
                                isUnlocked ? "text-white" : "text-white/50"
                              }`}
                            >
                              {episode.title}
                            </h3>
                            <p
                              className={`text-sm mb-3 leading-relaxed ${
                                isUnlocked ? "text-white/80" : "text-white/40"
                              }`}
                            >
                              {episode.description}
                            </p>
                            <div className="flex items-center gap-3 text-xs">
                              <span className="text-white/60">
                                {new Date(episode.date).toLocaleDateString("tl-PH", {
                                  month: "long",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </span>
                              <span className="px-3 py-1 bg-emerald-500/20 rounded-full text-emerald-300 font-semibold">
                                {episode.category}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 md:flex-col md:items-end">
                        <Button
                          onClick={() => handlePlay(episode)}
                          disabled={!isUnlocked}
                          className={`rounded-md transition-all ${
                            isUnlocked
                              ? "bg-[#163409] hover:bg-[#1b3e0d] text-white"
                              : "bg-white/10 text-white/40 cursor-not-allowed"
                          }`}
                        >
                          <Play size={16} className="mr-2" /> Pakinggan
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Modal Player */}
      {showModal && nowPlaying && !minimized && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-[9999] p-4">
          <div className="bg-gradient-to-br from-white/15 to-white/5 border border-white/30 backdrop-blur-xl rounded-3xl p-8 w-full max-w-2xl text-white relative shadow-2xl">
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={() => setMinimized(true)}
                className="text-white/70 hover:text-white hover:bg-white/10 p-2 rounded-full"
                title="I-minimize"
              >
                <ChevronDown size={20} />
              </button>
              <button
                onClick={closeModal}
                className="text-white/70 hover:text-white hover:bg-white/10 p-2 rounded-full"
                title="Isara"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center animate-pulse">
                <Music className="text-white" size={20} />
              </div>
              <div>
                <p className="text-xs text-white/60 uppercase tracking-wide">
                  Kasalukuyang Tumutugtog
                </p>
                <p className="text-sm text-white/80">{nowPlaying.category}</p>
              </div>
            </div>

            <h3 className="text-2xl font-bold mb-2 leading-tight">
              {nowPlaying.title}
            </h3>
            <p className="text-sm text-white/70 mb-4 leading-relaxed">
              {nowPlaying.description}
            </p>

            {/* Progress bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-xs text-white/60 mb-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-green-700 transition-all duration-300"
                  style={{ width: `${getProgressPercentage()}%` }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 mb-4">
              <Button
                onClick={togglePlayback}
                className="rounded-full w-14 h-14 flex items-center justify-center text-white bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 shadow-lg transition-all hover:scale-105"
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </Button>

              <Button
                onClick={() => handleAssessment(nowPlaying)}
                className="bg-[#163409] hover:bg-[#1b3e0d] text-white px-6 py-3 shadow-lg hover:scale-105 transition-all duration-300"
              >
                <ExternalLink size={16} className="mr-2" /> Kumuha ng Assessment
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Mini Player */}
      {minimized && nowPlaying && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-[95%] md:w-[750px] bg-gradient-to-r from-white/15 to-white/10 backdrop-blur-xl rounded-2xl border border-white/30 shadow-2xl flex items-center justify-between px-6 py-4 text-white z-[9999]">
          <div className="flex items-center gap-4 flex-1">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center flex-shrink-0">
              <Music className="text-white" size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold truncate">
                {nowPlaying.title}
              </h4>
              <div className="flex items-center justify-between text-xs text-white/60 mb-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
              <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-green-700 transition-all duration-300"
                  style={{ width: `${getProgressPercentage()}%` }}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 ml-4">
            <Button
              onClick={togglePlayback}
              className="rounded-full w-10 h-10 flex items-center justify-center bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 text-white shadow-lg"
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </Button>
            <Button
              onClick={() => setMinimized(false)}
              className="bg-white/20 hover:bg-white/30 border border-white/40 text-white px-4 py-2 rounded-lg"
            >
              <ChevronUp size={16} className="mr-2" /> I-expand
            </Button>
            <button
              onClick={closeModal}
              className="text-white/70 hover:text-white hover:bg-white/10 p-2 rounded-full"
              title="Isara"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default EpisodeSection;