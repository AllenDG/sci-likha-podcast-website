import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Episode {
  id: number;
  title: string;
  description: string;
  category: string;
  tags: string[];
  duration: string;
  date: string;
  thumbnail: string;
}

const EpisodeSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTag, setSelectedTag] = useState("all");
  const [sortBy, setSortBy] = useState("latest");

  // Sample episode data - replace with your actual data
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const episodes: Episode[] = [
    {
      id: 1,
      title: "Introduction to Cell Biology",
      description:
        "Explore the fundamental units of life, from prokaryotic bacteria to complex eukaryotic cells with specialized organelles.",
      category: "Cell Biology",
      tags: ["Cells", "Prokaryotes", "Eukaryotes"],
      duration: "45:30",
      date: "2024-10-15",
      thumbnail: "",
    },
    {
      id: 2,
      title: "Photosynthesis and Energy",
      description:
        "Discover how plants convert light energy into chemical energy through light-dependent and independent reactions.",
      category: "Plant Biology",
      tags: ["Photosynthesis", "Energy", "Chloroplasts"],
      duration: "38:20",
      date: "2024-10-10",
      thumbnail: "",
    },
    {
      id: 3,
      title: "Cellular Respiration",
      description:
        "Learn about glycolysis, Krebs cycle, and electron transport chain in ATP production and energy metabolism.",
      category: "Metabolism",
      tags: ["Respiration", "ATP", "Mitochondria"],
      duration: "52:15",
      date: "2024-10-05",
      thumbnail: "",
    },
    {
      id: 4,
      title: "Biodiversity and Classification",
      description:
        "Understanding Earth's variety of life from bacteria to complex organisms and taxonomic classification systems.",
      category: "Ecology",
      tags: ["Biodiversity", "Taxonomy", "Evolution"],
      duration: "41:45",
      date: "2024-09-30",
      thumbnail: "",
    },
  ];

  // Get unique categories and tags
  const categories = [
    "all",
    ...Array.from(new Set(episodes.map((ep) => ep.category))),
  ];
  const allTags = [
    "all",
    ...Array.from(new Set(episodes.flatMap((ep) => ep.tags))),
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

    if (selectedTag !== "all") {
      filtered = filtered.filter((ep) => ep.tags.includes(selectedTag));
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
  }, [episodes, searchQuery, selectedCategory, selectedTag, sortBy]);

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

            {/* Tag Filter */}
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-white/50 text-white"
            >
              {allTags.map((tag) => (
                <option
                  key={tag}
                  value={tag}
                  className="bg-gray-800 text-white"
                >
                  {tag === "all" ? "All Tags" : tag}
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
                    {/* Thumbnail */}
                    <div className="aspect-video bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/30">
                      <div className="w-20 h-20 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center group cursor-pointer hover:scale-110 transition-transform duration-300 shadow-lg border border-white/40">
                        <svg
                          className="w-10 h-10 text-white ml-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="md:col-span-2 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-semibold text-white bg-white/20 backdrop-blur-sm px-2 py-1 rounded border border-white/30">
                            Episode {episode.id}
                          </span>
                          <span className="text-xs text-white/70">
                            {episode.duration}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 drop-shadow">
                          {episode.title}
                        </h3>
                        <p className="text-white/80 text-sm mb-3 line-clamp-2 drop-shadow">
                          {episode.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="text-xs bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded border border-white/30">
                            {episode.category}
                          </span>
                          {episode.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs bg-white/15 backdrop-blur-sm text-white/90 px-2 py-1 rounded border border-white/20"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
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
