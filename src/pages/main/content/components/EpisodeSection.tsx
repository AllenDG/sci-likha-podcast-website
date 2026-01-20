/**
 * Episode Section Component
 * Displays podcast episodes with search, playback, and assessment functionality
 * Features: Audio player, episode filtering, progress tracking, responsive design
 */

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
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
  Volume2,
  VolumeX,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();
  
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
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [completedEpisodes, setCompletedEpisodes] = useState<number[]>([1]);
  const [isMuted, setIsMuted] = useState(false);
  const [error, setError] = useState<string | null>(null);
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

  const isEpisodeUnlocked = useCallback((episodeId: number) =>
    completedEpisodes.includes(episodeId), [completedEpisodes]);

  const handlePlay = useCallback(async (episode: Episode) => {
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

    try {
      setIsLoading(true);
      setError(null);
      
      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
      }

      const newAudio = new Audio(episode.content);
      newAudio.preload = "metadata";
      
      currentAudioRef.current = newAudio;
      setNowPlaying(episode);
      setShowModal(true);
      setMinimized(false);
      setDuration(0);

      const savedTime = savedProgress.current[episode.id] || 0;
      newAudio.currentTime = savedTime;

      newAudio.ontimeupdate = () => setCurrentTime(newAudio.currentTime);
      newAudio.onloadedmetadata = () => setDuration(newAudio.duration || 0);
      newAudio.onended = () => setIsPlaying(false);
      newAudio.onerror = () => {
        setError("Failed to load audio");
        setIsLoading(false);
      };
      newAudio.oncanplay = () => setIsLoading(false);

      await newAudio.play();
      setIsPlaying(true);
    } catch (err: unknown) {
      setError("Failed to play audio. Please try again.");
      setIsPlaying(false);
    } finally {
      setIsLoading(false);
    }
  }, [isEpisodeUnlocked]);

  const togglePlayback = useCallback(async () => {
    if (!currentAudioRef.current) return;
    
    try {
      if (isPlaying) {
        currentAudioRef.current.pause();
        setIsPlaying(false);
      } else {
        await currentAudioRef.current.play();
        setIsPlaying(true);
      }
    } catch (err: unknown) {
      setError("Playback failed");
    }
  }, [isPlaying]);

  const toggleMute = useCallback(() => {
    if (!currentAudioRef.current) return;
    
    currentAudioRef.current.muted = !currentAudioRef.current.muted;
    setIsMuted(currentAudioRef.current.muted);
  }, []);

  const handleSeek = useCallback((percentage: number) => {
    if (!currentAudioRef.current || !duration) return;
    
    const newTime = (percentage / 100) * duration;
    currentAudioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  }, [duration]);

  const handleAssessment = useCallback((episode: Episode) => {
    window.open(episode.assessmentLink, "_blank");
    const nextEpisodeId = episode.id + 1;
    if (!completedEpisodes.includes(nextEpisodeId)) {
      setCompletedEpisodes(prev => [...prev, nextEpisodeId]);
    }
  }, [completedEpisodes]);

  const closeModal = useCallback(() => {
    if (currentAudioRef.current && nowPlaying) {
      savedProgress.current[nowPlaying.id] = currentAudioRef.current.currentTime;
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0;
    }
    setShowModal(false);
    setNowPlaying(null);
    setIsPlaying(false);
    setError(null);
  }, [nowPlaying]);

  const formatTime = useCallback((time: number) => {
    if (!isFinite(time) || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  }, []);

  const getProgressPercentage = useCallback(() => {
    if (!duration || !isFinite(duration) || isNaN(duration)) return 0;
    return Math.min((currentTime / duration) * 100, 100);
  }, [currentTime, duration]);

  useEffect(() => {
    return () => {
      if (currentAudioRef.current) currentAudioRef.current.pause();
    };
  }, []);

  return (
    <section className="relative py-12 md:py-20 px-4 text-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 drop-shadow-lg">
            Mga Episodes
          </h2>
          <div className="w-16 md:w-24 h-1 bg-white/50" />
        </div>

        {/* Search Bar */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-4 md:p-6 mb-6 md:mb-8 border border-white/20">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-white/60" />
            <Input
              type="text"
              placeholder="Maghanap ng episodes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 md:pl-10 bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder:text-white/60 focus:ring-white/50 w-full text-sm md:text-base"
            />
          </div>
        </div>

        {/* Episodes List */}
        <div className="space-y-4 md:space-y-6">
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
                <CardContent className="p-4 md:p-6">
                  <div className="flex flex-col gap-4">
                    {/* Mobile: Image first, then content */}
                    <div className={`${isMobile ? 'order-1' : 'md:flex-row'} flex flex-col md:flex-row gap-4`}>
                      {/* Thumbnail */}
                      <div className={`flex-shrink-0 ${isMobile ? 'w-full' : 'w-full md:w-48'}`}>
                        <img
                          src={episode.thumbnail}
                          alt={episode.title}
                          className={`w-full rounded-lg shadow-lg border border-white/20 object-cover ${
                            isMobile ? 'h-48' : 'h-auto'
                          }`}
                          loading="lazy"
                        />
                      </div>

                      {/* Content */}
                      <div className={`flex-1 flex flex-col justify-between gap-4 ${isMobile ? 'order-2' : ''}`}>
                        <div className="flex-1">
                          <div className="flex items-start gap-3 mb-3">
                            {isCompleted && (
                              <CheckCircle className="text-green-400 flex-shrink-0 mt-1" size={isMobile ? 20 : 24} />
                            )}
                            <div className="flex-1 min-w-0">
                              <h3
                                className={`font-bold mb-2 leading-tight ${
                                  isUnlocked ? "text-white" : "text-white/50"
                                } ${isMobile ? 'text-lg' : 'text-xl'}`}
                              >
                                {episode.title}
                              </h3>
                              <p
                                className={`mb-3 leading-relaxed ${
                                  isUnlocked ? "text-white/80" : "text-white/40"
                                } ${isMobile ? 'text-xs' : 'text-sm'}`}
                              >
                                {episode.description}
                              </p>
                              <div className={`flex items-center gap-3 ${isMobile ? 'text-xs' : 'text-xs'}`}>
                                <span className="text-white/60">
                                  {new Date(episode.date).toLocaleDateString("tl-PH", {
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric",
                                  })}
                                </span>
                                <span className="px-2 md:px-3 py-1 bg-emerald-500/20 rounded-full text-emerald-300 font-semibold">
                                  {episode.category}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Action Button */}
                        <div className="flex justify-start">
                          <Button
                            onClick={() => handlePlay(episode)}
                            disabled={!isUnlocked || isLoading}
                            className={`rounded-md transition-all ${
                              isUnlocked
                                ? "bg-[#163409] hover:bg-[#1b3e0d] text-white"
                                : "bg-white/10 text-white/40 cursor-not-allowed"
                            } ${isMobile ? 'text-sm px-4 py-2' : 'px-6 py-3'}`}
                          >
                            {isLoading ? (
                              <div className="animate-spin rounded-full border-2 border-white border-t-transparent w-4 h-4 mr-2" />
                            ) : (
                              <Play size={isMobile ? 14 : 16} className="mr-2" />
                            )}
                            Pakinggan
                          </Button>
                        </div>
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
          <div className={`bg-gradient-to-br from-white/15 to-white/5 border border-white/30 backdrop-blur-xl rounded-3xl text-white relative shadow-2xl ${
            isMobile ? 'w-full max-w-sm p-6' : 'p-8 w-full max-w-2xl'
          }`}>
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={() => setMinimized(true)}
                className="text-white/70 hover:text-white hover:bg-white/10 p-2 rounded-full"
                title="I-minimize"
              >
                <ChevronDown size={isMobile ? 16 : 20} />
              </button>
              <button
                onClick={closeModal}
                className="text-white/70 hover:text-white hover:bg-white/10 p-2 rounded-full"
                title="Isara"
              >
                <X size={isMobile ? 16 : 20} />
              </button>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <div className={`bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center animate-pulse ${
                isMobile ? 'w-8 h-8' : 'w-10 h-10'
              }`}>
                <Music className="text-white" size={isMobile ? 16 : 20} />
              </div>
              <div>
                <p className={`text-white/60 uppercase tracking-wide ${
                  isMobile ? 'text-xs' : 'text-xs'
                }`}>
                  Kasalukuyang Tumutugtog
                </p>
                <p className={`text-white/80 ${
                  isMobile ? 'text-xs' : 'text-sm'
                }`}>{nowPlaying.category}</p>
              </div>
            </div>

            <h3 className={`font-bold mb-2 leading-tight ${
              isMobile ? 'text-lg' : 'text-2xl'
            }`}>
              {nowPlaying.title}
            </h3>
            <p className={`text-white/70 mb-4 leading-relaxed ${
              isMobile ? 'text-xs' : 'text-sm'
            }`}>
              {nowPlaying.description}
            </p>

            {error && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            {/* Progress bar */}
            <div className="mb-4">
              <div className={`flex items-center justify-between text-white/60 mb-1 ${
                isMobile ? 'text-xs' : 'text-xs'
              }`}>
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
              <div 
                className="h-2 bg-white/10 rounded-full overflow-hidden cursor-pointer"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const percentage = ((e.clientX - rect.left) / rect.width) * 100;
                  handleSeek(percentage);
                }}
              >
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-green-700 transition-all duration-300"
                  style={{ width: `${getProgressPercentage()}%` }}
                />
              </div>
            </div>

            <div className={`flex items-center gap-4 mb-4 ${
              isMobile ? 'justify-center' : 'justify-between'
            }`}>
              <div className="flex items-center gap-3">
                {!isMobile && (
                  <button
                    onClick={toggleMute}
                    className="text-white/70 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors"
                    title={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  </button>
                )}
                
                <Button
                  onClick={togglePlayback}
                  disabled={isLoading || !!error}
                  className={`rounded-full flex items-center justify-center text-white bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
                    isMobile ? 'w-12 h-12' : 'w-14 h-14'
                  }`}
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full border-2 border-white border-t-transparent w-6 h-6" />
                  ) : isPlaying ? (
                    <Pause size={isMobile ? 20 : 24} />
                  ) : (
                    <Play size={isMobile ? 20 : 24} />
                  )}
                </Button>
              </div>

              {!isMobile && (
                <Button
                  onClick={() => handleAssessment(nowPlaying)}
                  className="bg-[#163409] hover:bg-[#1b3e0d] text-white px-6 py-3 shadow-lg hover:scale-105 transition-all duration-300"
                >
                  <ExternalLink size={16} className="mr-2" /> Kumuha ng Assessment
                </Button>
              )}
            </div>
            
            {isMobile && (
              <Button
                onClick={() => handleAssessment(nowPlaying)}
                className="w-full bg-[#163409] hover:bg-[#1b3e0d] text-white py-3 shadow-lg transition-all duration-300"
              >
                <ExternalLink size={16} className="mr-2" /> Kumuha ng Assessment
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Mini Player */}
      {minimized && nowPlaying && (
        <div className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-white/15 to-white/10 backdrop-blur-xl rounded-2xl border border-white/30 shadow-2xl flex items-center justify-between text-white z-[9999] ${
          isMobile ? 'w-[95%] px-4 py-3' : 'w-[750px] px-6 py-4'
        }`}>
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className={`bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center flex-shrink-0 ${
              isMobile ? 'w-10 h-10' : 'w-12 h-12'
            }`}>
              <Music className="text-white" size={isMobile ? 16 : 20} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className={`font-semibold truncate ${
                isMobile ? 'text-xs' : 'text-sm'
              }`}>
                {nowPlaying.title}
              </h4>
              <div className={`flex items-center justify-between text-white/60 mb-1 ${
                isMobile ? 'text-xs' : 'text-xs'
              }`}>
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
              <div 
                className="w-full h-1 bg-white/20 rounded-full overflow-hidden cursor-pointer"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const percentage = ((e.clientX - rect.left) / rect.width) * 100;
                  handleSeek(percentage);
                }}
              >
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-green-700 transition-all duration-300"
                  style={{ width: `${getProgressPercentage()}%` }}
                />
              </div>
            </div>
          </div>
          <div className={`flex items-center ml-3 ${
            isMobile ? 'gap-2' : 'gap-3'
          }`}>
            <Button
              onClick={togglePlayback}
              disabled={isLoading || !!error}
              className={`rounded-full flex items-center justify-center bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 text-white shadow-lg disabled:opacity-50 ${
                isMobile ? 'w-8 h-8' : 'w-10 h-10'
              }`}
            >
              {isLoading ? (
                <div className="animate-spin rounded-full border-2 border-white border-t-transparent w-4 h-4" />
              ) : isPlaying ? (
                <Pause size={isMobile ? 14 : 18} />
              ) : (
                <Play size={isMobile ? 14 : 18} />
              )}
            </Button>
            <Button
              onClick={() => setMinimized(false)}
              className={`bg-white/20 hover:bg-white/30 border border-white/40 text-white rounded-lg ${
                isMobile ? 'px-2 py-1 text-xs' : 'px-4 py-2'
              }`}
            >
              <ChevronUp size={isMobile ? 12 : 16} className={isMobile ? '' : 'mr-2'} />
              {!isMobile && ' I-expand'}
            </Button>
            <button
              onClick={closeModal}
              className="text-white/70 hover:text-white hover:bg-white/10 p-2 rounded-full"
              title="Isara"
            >
              <X size={isMobile ? 16 : 20} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default EpisodeSection;