import { useState } from "react";
import AddContentModal from "./components/AddContentModal";
import ContentHeader from "./components/ContentHeader";
import ContentTable from "./components/ContentTable";

export interface ContentItem {
  id: string;
  episodeId: string;
  title: string;
  category: string;
  releaseDate: string;
  text: string;
  description?: string;
  tags?: string[];
  assessmentUrl?: string;
  createdBy?: string;
  imageUrl?: string;
  type: "episode" | "gallery";
}

const ContentManagementPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);

  // Sample data - replace with actual API data
  const [contentData, setContentData] = useState<ContentItem[]>([
    {
      id: "1",
      episodeId: "123456789",
      title: "Accumsan pen atibus ultricies",
      category: "General Biology",
      releaseDate: "09/30/2025",
      text: "Cell Text",
      description: "Introduction to cell biology and structures",
      tags: ["cells", "biology", "science"],
      assessmentUrl: "https://example.com/assessment1",
      type: "episode",
    },
    // Add more sample data as needed
  ]);

  const handleAddContent = (newContent: Omit<ContentItem, "id">) => {
    const newItem: ContentItem = {
      ...newContent,
      id: Date.now().toString(),
    };
    setContentData([newItem, ...contentData]);
    setIsModalOpen(false);
  };

  const handleEdit = (id: string) => {
    console.log("Edit item:", id);
    // Implement edit logic
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setContentData(contentData.filter((item) => item.id !== id));
    }
  };

  const handleView = (id: string) => {
    console.log("View item:", id);
    // Implement view logic
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <ContentHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
          onAddNew={() => setIsModalOpen(true)}
        />

        <ContentTable
          data={contentData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          sortBy={sortBy}
        />

        <AddContentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddContent}
        />
      </div>
    </div>
  );
};

export default ContentManagementPage;
