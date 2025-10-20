import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface AnnouncementHeaderProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  onAddNew: () => void;
}

const AnnouncementHeader = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  onAddNew,
}: AnnouncementHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
      <h1 className="text-2xl font-semibold text-gray-800">
        Announcement Management
      </h1>

      <div className="flex flex-wrap items-center gap-3">
        <Input
          placeholder="Search announcements..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-60"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border rounded-lg px-3 py-2"
        >
          <option value="all">All Categories</option>
          <option value="System Update">System Update</option>
          <option value="General">General</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border rounded-lg px-3 py-2"
        >
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
        </select>
        <Button
          onClick={onAddNew}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
        >
          <PlusCircle className="w-4 h-4 font-extrabold" />
          Add Announcement
        </Button>
      </div>
    </div>
  );
};

export default AnnouncementHeader;
