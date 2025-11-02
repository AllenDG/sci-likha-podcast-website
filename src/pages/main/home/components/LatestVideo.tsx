import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { Play, Pause, Music } from "lucide-react";
import episodeOne from "@/assets/others/EP1_-Selyula-101-—-Overview-of-the-Beginning-of-Life-Made-with-Clipchamp.mp3";
import episodeTwo from "@/assets/others/EP-2_-Selyula-101-—-Overview-of-the-Beginning-of-Life.mp3";
import episodeThree from "@/assets/others/EP-3_-SelTalk-—-Parts-and-Functions-of-the-Cell-Made-with-Clipchamp.mp3";
import episodeFour from "@/assets/others/EP-4_-Likas-na-Selyula_-Cell-Cycle-and-Cell-Division.mp3";

interface EpisodeData {
  id: number;
  episode_id: string;
  title: string;
  description: string;
  category: string;
  content: string;
  created_at: string;
  type: "episode";
}

const episodeData: EpisodeData[] = [
  {
    id: 1,
    episode_id: "EP001",
    title: "Introduction to Podcasting",
    description: "Getting started with your first podcast",
    category: "Tutorial",
    content: episodeOne,
    created_at: "02/11/2025",
    type: "episode",
  },
  {
    id: 2,
    episode_id: "EP002",
    title: "Advanced Audio Editing",
    description: "Tips and tricks for professional audio",
    category: "Tutorial",
    content: episodeTwo,
    created_at: "02/11/2025",
    type: "episode",
  },
  {
    id: 3,
    episode_id: "EP003",
    title: "Growing Your Audience",
    description: "Marketing strategies for podcasters",
    category: "Marketing",
    content: episodeThree,
    created_at: "02/11/2025",
    type: "episode",
  },
  {
    id: 4,
    episode_id: "EP004",
    title: "Monetization Methods",
    description: "How to earn from your podcast",
    category: "Business",
    content: episodeFour,
    created_at: "02/11/2025",
    type: "episode",
  },
];

const LatestVideo = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [episodes, setEpisodes] = useState<EpisodeData[]>([]);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(
    null
  );
  const [nowPlaying, setNowPlaying] = useState<EpisodeData | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const duration = 40; // fixed 40 seconds

  const stopTimerRef = useRef<number | null>(null);

  useEffect(() => {
    setEpisodes(episodeData);

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
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
    if (stopTimerRef.current) clearTimeout(stopTimerRef.current);

    const audio = new Audio(episode.content);

    audio.ontimeupdate = () => setCurrentTime(audio.currentTime);

    audio
      .play()
      .then(() => {
        stopTimerRef.current = setTimeout(() => {
          audio.pause();
          audio.currentTime = 0;
          setIsPlaying(false);
          setNowPlaying(null);
        }, 40000);
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
            Latest Episodes
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
              <Card className="overflow-hidden shadow-lg border border-white/20 bg-white/10 backdrop-blur-md hover:shadow-2xl hover:bg-white/15 transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-0">
                  <div className="aspect-video bg-white/20 flex items-center justify-center border-b border-white/20 text-center text-white/80 text-sm p-4">
                    🎧 {episode.title}
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col items-start p-4 gap-2">
                  <p className="text-xs text-white/70 uppercase tracking-wide drop-shadow">
                    {episode.category}
                  </p>
                  <h3 className="text-sm font-semibold text-white line-clamp-2 drop-shadow">
                    {episode.title}
                  </h3>
                  <p className="text-xs text-white/60 drop-shadow">
                    {episode.created_at}
                  </p>
                  <Button
                    onClick={() => handlePlay(episode)}
                    variant="default"
                    size="sm"
                    className="w-full mt-2 text-white rounded-md hover:scale-105 transition-transform duration-300"
                    style={{ backgroundColor: "#163409" }}
                  >
                    ▶ Play Episode
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
                  Now Playing
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
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
            </div>

           
          </div>
        </div>
      )}
    </section>
  );
};

export default LatestVideo;
