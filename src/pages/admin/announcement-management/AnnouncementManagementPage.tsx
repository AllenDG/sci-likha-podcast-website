import { useState } from "react";
import AddAnnouncementModal from "./components/AnnouncementModal";
import AnnouncementHeader from "./components/AnnouncementHeader";
import AnnouncementTable from "./components/AnnouncementTable";

export interface AnnouncementItem {
  id: string;
  title: string;
  message: string;
  category: string;
  datePosted: string;
  status: "active" | "archived";
  createdBy?: string;
}

const AnnouncementManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);

  const [announcementData, setAnnouncementData] = useState<AnnouncementItem[]>([
    {
      id: "1",
      title: "Website Maintenance",
      message: "The site will be under maintenance this Sunday.",
      category: "System Update",
      datePosted: "2025-10-20",
      status: "active",
      createdBy: "Admin",
    },
  ]);

  const handleAddAnnouncement = (newAnnouncement: Omit<AnnouncementItem, "id">) => {
    const newItem: AnnouncementItem = {
      ...newAnnouncement,
      id: Date.now().toString(),
    };
    setAnnouncementData([newItem, ...announcementData]);
    setIsModalOpen(false);

    // Placeholder for email notification logic
    console.log("Email notification sent to users:", newItem.title);
  };

  const handleEdit = (id: string) => {
    console.log("Edit announcement:", id);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this announcement?")) {
      setAnnouncementData(announcementData.filter((a) => a.id !== id));
    }
  };

  const handleView = (id: string) => {
    console.log("View announcement:", id);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <AnnouncementHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
          onAddNew={() => setIsModalOpen(true)}
        />

        <AnnouncementTable
          data={announcementData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          sortBy={sortBy}
        />

        <AddAnnouncementModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddAnnouncement}
        />
      </div>
    </div>
  );
};

export default AnnouncementManagement;
