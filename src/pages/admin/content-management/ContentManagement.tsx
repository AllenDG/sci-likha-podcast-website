import { useState, useEffect } from "react";
import AddContentModal from "./components/AddContentModal";
import ContentHeader from "./components/ContentHeader";
import ContentTable from "./components/ContentTable";
import { crud } from "../../../../api/index";
import { AxiosError } from "axios";

export interface ContentItem {
  id: string;
  episode_id: string;
  title: string;
  category: string;
  created_at: string;
  description?: string;
  content?: string; // Url of video or gallery
  created_by?: string;
  type: "episode" | "gallery";
}

const ContentManagementPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);

  // Sample data - replace with actual API data
  const [contentData, setContentData] = useState<ContentItem[]>([]);

  const fetchContent = async () => {
    try {
      const response = await crud.get<ContentItem[]>("/v1/content/get-all-contents");
      setContentData(response);
    } catch (err) {
      const axiosError = err as AxiosError<{ message?: string }>;
      console.error(axiosError.response?.data?.message || "Failed to fetch content data.");
    }
  };

  // --- FETCH CONTENT DATA ---
  useEffect(() => {
    fetchContent();
  }, []);

  const handleEdit = (id: string) => {
    console.log("Edit item:", id);
    // Implement edit logic - Alaws ka namang edit modal pre haha
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this content post?")) return;

    try {
      await crud.delete(`/v1/content-posts/delete-post/${id}`);
      fetchContent();
    } catch (err) {
      const axiosError = err as AxiosError<{ message?: string }>;
      console.error(axiosError.response?.data?.message || "Delete failed");
      alert("Failed to delete content post.");
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
          onSubmit={fetchContent}
        />
      </div>
    </div>
  );
};

export default ContentManagementPage;
