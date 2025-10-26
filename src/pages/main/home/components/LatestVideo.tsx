import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { episodeData } from "@/assets/others/episodeDAta";
import { Play, Pause, Music } from "lucide-react";

interface EpisodeData {
  id: number;
  episode_id: string;
  title: string;
  description: string;
  category: string;
  content: string; // path to audio file
  created_at: string;
  type: "episode";
}

const LatestVideo = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [episodes, setEpisodes] = useState<EpisodeData[]>([]);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(
    null
  );
  const [nowPlaying, setNowPlaying] = useState<EpisodeData | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setEpisodes(episodeData); // Load directly from imported data

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

    const audio = new Audio(episode.content);
    audio.play();

    audio.onended = () => {
      setIsPlaying(false);
      setNowPlaying(null);
    };

    setCurrentAudio(audio);
    setNowPlaying(episode);
    setIsPlaying(true);
  };

  const togglePlayback = () => {
    if (!currentAudio) return;

    if (isPlaying) {
      currentAudio.pause();
    } else {
      currentAudio.play();
    }
    setIsPlaying(!isPlaying);
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

        {/* Episode Cards */}
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
                  <div className="aspect-video bg-white/20 backdrop-blur-sm flex items-center justify-center border-b border-white/20 rounded-lg overflow-hidden text-center text-white/80 text-sm p-4">
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

      {/* Now Playing Section */}
      {nowPlaying && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-[90%] md:w-[60%] bg-white/10 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 flex items-center justify-between px-5 py-3 text-white animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-200/20 rounded-full flex items-center justify-center">
              <Music className="text-blue-300" size={22} />
            </div>
            <div>
              <p className="text-xs text-white/60">Now Playing</p>
              <h4 className="text-sm font-semibold">{nowPlaying.title}</h4>
            </div>
          </div>

          <Button
            onClick={togglePlayback}
            className="rounded-full w-10 h-10 flex items-center justify-center text-white bg-blue-600 hover:bg-blue-700 transition"
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </Button>
        </div>
      )}
    </section>
  );
};

export default LatestVideo;
