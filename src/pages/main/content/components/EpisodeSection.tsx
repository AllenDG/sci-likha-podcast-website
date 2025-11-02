import { useState, useMemo, useRef, useEffect } from "react";
import {
  Search,
  Music,
  Play,
  Pause,
  X,
  ChevronDown,
  ChevronUp,
  Lock,
  CheckCircle,
  ExternalLink,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import episodeOne from "@/assets/others/EP1_-Selyula-101-—-Overview-of-the-Beginning-of-Life-Made-with-Clipchamp.mp3";
import episodeTwo from "@/assets/others/EP-2_-Selyula-101-—-Overview-of-the-Beginning-of-Life.mp3";
import episodeThree from "@/assets/others/EP-3_-SelTalk-—-Parts-and-Functions-of-the-Cell-Made-with-Clipchamp.mp3";
import episodeFour from "@/assets/others/EP-4_-Likas-na-Selyula_-Cell-Cycle-and-Cell-Division.mp3";

interface Episode {
  id: number;
  title: string;
  description: string;
  category: string;
  content: string;
  date: string;
  assessmentLink: string;
}

const EpisodeSection = () => {
  const localEpisodes: Episode[] = [
    {
      id: 1,
      title: "EP 1 — Overview of the Beginning of Life",
      description:
        "Discover how life begins at the cellular level in this engaging first episode.",
      category: "Biology",
      content: episodeOne,
      date: "2025-10-01",
      assessmentLink: "https://example.com/assessment/episode1",
    },
    {
      id: 2,
      title: "EP 2 — Selyula 101: A Deeper Dive",
      description:
        "Continue exploring the structure and significance of cells in living organisms.",
      category: "Biology",
      content: episodeTwo,
      date: "2025-10-05",
      assessmentLink: "https://example.com/assessment/episode2",
    },
    {
      id: 3,
      title: "EP 3 — SelTalk: Parts and Functions of the Cell",
      description:
        "Understand the critical parts of a cell and their respective functions in detail.",
      category: "Science",
      content: episodeThree,
      date: "2025-10-10",
      assessmentLink: "https://example.com/assessment/episode3",
    },
    {
      id: 4,
      title: "EP 4 — Likas na Selyula: Cell Cycle & Division",
      description:
        "Learn about the process of cell growth, division, and replication.",
      category: "Science",
      content: episodeFour,
      date: "2025-10-15",
      assessmentLink: "https://example.com/assessment/episode4",
    },
  ];

  const [episodes] = useState(localEpisodes);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("latest");
  const [nowPlaying, setNowPlaying] = useState<Episode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(40); // Default 40 seconds
  const [showModal, setShowModal] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [completedEpisodes, setCompletedEpisodes] = useState<number[]>([1]);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const savedProgress = useRef<Record<number, number>>({});

  const categories = [
    "all",
    ...Array.from(new Set(episodes.map((ep) => ep.category))),
  ];

  const filteredEpisodes = useMemo(() => {
    let filtered = episodes;

    if (searchQuery) {
      filtered = filtered.filter(
        (ep) =>
          ep.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ep.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((ep) => ep.category === selectedCategory);
    }

    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === "latest")
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortBy === "oldest")
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      if (sortBy === "title") return a.title.localeCompare(b.title);
      return 0;
    });

    return sorted;
  }, [episodes, searchQuery, selectedCategory, sortBy]);

  const isEpisodeUnlocked = (episodeId: number) =>
    completedEpisodes.includes(episodeId);

  const handlePlay = (episode: Episode) => {
    if (!isEpisodeUnlocked(episode.id)) {
      alert(
        "This episode is locked! Complete the assessment for the previous episode to unlock it."
      );
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
            Browse Episodes
          </h2>
          <div className="w-24 h-1 bg-white/50" />
        </div>

        {/* Filters */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6 mb-8 border border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
              <Input
                type="text"
                placeholder="Search episodes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder:text-white/60 focus:ring-white/50"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-md text-white focus:ring-2 focus:ring-white/50"
            >
              {categories.map((cat) => (
                <option
                  key={cat}
                  value={cat}
                  className="bg-gray-800 text-white"
                >
                  {cat === "all" ? "All Categories" : cat}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-md text-white focus:ring-2 focus:ring-white/50"
            >
              <option value="latest">Latest First</option>
              <option value="oldest">Oldest First</option>
              <option value="title">Title (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Episodes */}
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
                <CardContent className="p-6 flex flex-col md:flex-row justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {isCompleted ? (
                        <CheckCircle className="text-green-400" size={20} />
                      ) : !isUnlocked ? (
                        <Lock className="text-white/60" size={20} />
                      ) : null}
                      <h3
                        className={`text-xl font-bold ${
                          isUnlocked ? "text-white" : "text-white/50"
                        }`}
                      >
                        {episode.title}
                      </h3>
                    </div>
                    <p
                      className={`text-sm mb-2 ${
                        isUnlocked ? "text-white/70" : "text-white/40"
                      }`}
                    >
                      {episode.description}
                    </p>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="text-white/60">
                        {new Date(episode.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <span className="px-2 py-1 bg-white/10 rounded-full text-white/70">
                        {episode.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handlePlay(episode)}
                      disabled={!isUnlocked}
                      className={`rounded-md transition-all ${
                        isUnlocked
                          ? "bg-[#163409] hover:bg-[#1b3e0d] text-white"
                          : "bg-white/10 text-white/40 cursor-not-allowed"
                      }`}
                    >
                      <Play size={16} className="mr-2" /> Play
                    </Button>
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
                title="Minimize"
              >
                <ChevronDown size={20} />
              </button>
              <button
                onClick={closeModal}
                className="text-white/70 hover:text-white hover:bg-white/10 p-2 rounded-full"
                title="Close"
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
                  Now Playing
                </p>
                <p className="text-sm text-white/80">{nowPlaying.category}</p>
              </div>
            </div>

            <h3 className="text-2xl font-bold mb-2 leading-tight">
              {nowPlaying.title}
            </h3>
            <p className="text-sm text-white/70 mb-4">
              {nowPlaying.description}
            </p>

            {/* Progress bar merged with duration */}
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
                <ExternalLink size={16} className="mr-2" /> Take Assessment
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
              <ChevronUp size={16} className="mr-2" /> Expand
            </Button>
            <button
              onClick={closeModal}
              className="text-white/70 hover:text-white hover:bg-white/10 p-2 rounded-full"
              title="Close"
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
