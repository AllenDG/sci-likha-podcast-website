import { useState, useMemo, useEffect, useRef } from "react";
import { Search, Music, Play, Pause } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { crud } from "../../../../../api/index";
import { AxiosError } from "axios";
import { episodeData } from "@/assets/others/episodeDAta";

interface Episode {
  id: number;
  title: string;
  description: string;
  category: string;
  content: string;
  date: string;
}

interface ContentPost {
  id: number;
  title: string | null;
  description: string | null;
  content: string | null;
  created_at: string;
  category: string | null;
  episode_id: string | null;
  type: string | null;
  assessment_url?: string | null;
}

const EpisodeSection = () => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("latest");
  const [nowPlaying, setNowPlaying] = useState<Episode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);

  const fetchEpisodes = async () => {
    try {
      const response = await crud.get<ContentPost[]>(
        "/v1/content/get-all-contents"
      );
      const posts = response || [];

      if (posts.length === 0) {
        const localEpisodes: Episode[] = episodeData.map((ep) => ({
          id: ep.id,
          title: ep.title,
          description: ep.description,
          category: ep.category,
          content: ep.content,
          date: ep.created_at,
        }));
        setEpisodes(localEpisodes);
        return;
      }

      const apiEpisodes: Episode[] = posts.map((post) => ({
        id: post.id,
        title: post.title ?? "--",
        description: post.description ?? "--",
        category: post.category ?? "--",
        content: post.content ?? "",
        date: post.created_at,
      }));

      setEpisodes(apiEpisodes);
    } catch (err) {
      const axiosError = err as AxiosError<{ message?: string }>;
      console.error(axiosError.response?.data.message || axiosError.message);

      const localEpisodes: Episode[] = episodeData.map((ep) => ({
        id: ep.id,
        title: ep.title,
        description: ep.description,
        category: ep.category,
        content: ep.content,
        date: ep.created_at,
      }));
      setEpisodes(localEpisodes);
    }
  };

  useEffect(() => {
    fetchEpisodes();
  }, []);

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
      if (sortBy === "latest") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sortBy === "oldest") {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

    return sorted;
  }, [episodes, searchQuery, selectedCategory, sortBy]);

  const handlePlay = (episode: Episode) => {
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0;
    }

    const newAudio = new Audio(episode.content);
    newAudio.play();
    currentAudioRef.current = newAudio;
    setNowPlaying(episode);
    setIsPlaying(true);

    newAudio.onended = () => {
      setIsPlaying(false);
      setNowPlaying(null);
    };
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

  return (
    <section className="relative py-20 px-4 text-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
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
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder:text-white/60 focus:ring-white/50"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-white/50 text-white"
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
              className="px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-white/50 text-white"
            >
              <option value="latest" className="bg-gray-800 text-white">
                Latest First
              </option>
              <option value="oldest" className="bg-gray-800 text-white">
                Oldest First
              </option>
              <option value="title" className="bg-gray-800 text-white">
                Title (A-Z)
              </option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-white/80 mb-6 drop-shadow">
          Showing {filteredEpisodes.length} episode
          {filteredEpisodes.length !== 1 ? "s" : ""}
        </p>

        {/* Episodes List */}
        <div className="space-y-6">
          {filteredEpisodes.length > 0 ? (
            filteredEpisodes.map((episode) => (
              <Card
                key={episode.id}
                className="overflow-hidden shadow-lg border border-white/20 bg-white/10 backdrop-blur-md hover:shadow-2xl hover:bg-white/15 transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-3 gap-6 p-6">
                    <div className="aspect-video bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/30 overflow-hidden">
                      <Button
                        onClick={() => handlePlay(episode)}
                        className="text-white bg-[#163409] hover:bg-[#1b3e0d] rounded-md px-4 py-2"
                      >
                        ▶ Play Episode
                      </Button>
                    </div>

                    <div className="md:col-span-2 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-semibold text-white bg-white/20 backdrop-blur-sm px-2 py-1 rounded border border-white/30">
                            Episode {episode.id}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 drop-shadow">
                          {episode.title}
                        </h3>
                        <p className="text-white/80 text-sm mb-3 line-clamp-2 drop-shadow">
                          {episode.description}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-white/70 drop-shadow">
                          {new Date(episode.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                        <Button
                          className="text-white rounded-md hover:scale-105 transition-transform duration-300"
                          style={{ backgroundColor: "#163409" }}
                        >
                          Answer Assessment
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-12 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
              <p className="text-white/80 text-lg drop-shadow">
                No episodes found matching your filters.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Now Playing Bar */}
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

export default EpisodeSection;
