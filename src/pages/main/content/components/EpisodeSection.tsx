import { useState, useMemo, useEffect } from "react";
import { Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { crud } from "../../../../../api/index"; // make sure this path is correct
import { AxiosError } from "axios";

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
  content: string | null; // the URL
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

  const fetchEpisodes = async () => {
    try {
      const response = await crud.get<ContentPost[]>("/v1/content/get-all-contents");
      const posts = response || [];

      const data: Episode[] = await Promise.all(
        posts.map(async (post) => {
          return {
            id: post.id,
            title: post.title ?? "--",
            description: post.description ?? "--",
            category: post.category ?? "--",
            content: post.content ?? "--",
            date: post.created_at, // created_at from DB
          };
        })
      );
      
      setEpisodes(data);
    } catch (err) {
      const axiosError = err as AxiosError<{ message?: string }>;
      console.error(axiosError.response?.data.message || axiosError.message);
    }
  };

  // Fetch episodes from API
  useEffect(() => {
    fetchEpisodes();
  }, []);

  // Get unique categories and tags
  const categories = [
    "all",
    ...Array.from(new Set(episodes.map((ep) => ep.category))),
  ];

  // Filter and sort episodes
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
            {/* Search */}
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

            {/* Category Filter */}
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

            {/* Sort By */}
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
                    {/* Video / Thumbnail */}
                    <div className="aspect-video bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/30 overflow-hidden">
                      {episode.content ? (
                        (() => {
                          const url = episode.content;

                          // YouTube
                          if (url.includes("youtube.com") || url.includes("youtu.be")) {
                            const videoIdMatch = url.match(
                              /(?:youtube\.com\/.*v=|youtu\.be\/)([\w-]+)/
                            );
                            const videoId = videoIdMatch ? videoIdMatch[1] : "";
                            const embedUrl = `https://www.youtube.com/embed/${videoId}`;
                            return (
                              <iframe
                                className="w-full h-full rounded-lg"
                                src={embedUrl}
                                title={episode.title}
                                allowFullScreen
                              />
                            );
                          }

                          // Google Drive
                          if (url.includes("drive.google.com")) {
                            const fileIdMatch = url.match(/[-\w]{25,}/);
                            const fileId = fileIdMatch ? fileIdMatch[0] : "";
                            const embedUrl = `https://drive.google.com/uc?export=preview&id=${fileId}`;
                            return (
                              <iframe
                                className="w-full h-full rounded-lg"
                                src={embedUrl}
                                title={episode.title}
                                allowFullScreen
                              />
                            );
                          }

                          // OneDrive
                          if (url.includes("onedrive.live.com")) {
                            const residMatch = url.match(/resid=([^&]+)/);
                            const embedUrl = residMatch
                              ? `https://onedrive.live.com/download?resid=${residMatch[1]}`
                              : url;
                            return (
                              <video
                                className="w-full h-full rounded-lg"
                                src={embedUrl}
                                controls
                              />
                            );
                          }

                          // Fallback / Direct video URL
                          return <video className="w-full h-full rounded-lg" src={url} controls />;
                        })()
                      ) : (
                        <div className="w-20 h-20 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center group cursor-pointer hover:scale-110 transition-transform duration-300 shadow-lg border border-white/40">
                          <svg
                            className="w-10 h-10 text-white ml-1"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Content */}
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
    </section>
  );
};

export default EpisodeSection;
