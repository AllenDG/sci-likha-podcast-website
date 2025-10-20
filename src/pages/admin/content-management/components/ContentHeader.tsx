import { Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ContentHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  onAddNew: () => void;
}

const ContentHeader = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  onAddNew,
}: ContentHeaderProps) => {
  const categories = [
    "all",
    "General Biology",
    "Cell Biology",
    "Plant Biology",
    "Metabolism",
    "Ecology",
  ];

  return (
    <div className="mb-8">
      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Content Management
      </h1>

      {/* Filters Row */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full md:w-auto">
          {/* Search */}
          <div className="relative flex-1 min-w-[280px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by title, ID or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-3 w-full bg-white border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent shadow-sm"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-gray-700 font-medium min-w-[160px] shadow-sm cursor-pointer"
          >
            <option value="all">All Categories</option>
            {categories.slice(1).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-gray-700 font-medium min-w-[160px] shadow-sm cursor-pointer"
          >
            <option value="latest">Latest First</option>
            <option value="oldest">Oldest First</option>
            <option value="title">Title (A-Z)</option>
          </select>
        </div>

        {/* Add New Button */}
        <Button
          onClick={onAddNew}
          className="text-white px-8 py-3 rounded-2xl font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity whitespace-nowrap shadow-lg"
          style={{ backgroundColor: "#163409" }}
        >
          <Plus className="w-5 h-5" />
          <span>ADD NEW</span>
        </Button>
      </div>
    </div>
  );
};

export default ContentHeader;
