import { Pencil, Trash2, Eye } from "lucide-react";
import type { AnnouncementItem } from "../AnnouncementManagementPage";

interface AnnouncementTableProps {
  data: AnnouncementItem[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
  searchQuery: string;
  selectedCategory: string;
  sortBy: string;
}

const AnnouncementTable = ({
  data,
  onEdit,
  onDelete,
  onView,
  searchQuery,
  selectedCategory,
  sortBy,
}: AnnouncementTableProps) => {
  const filteredData = data
    .filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.message.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) =>
      sortBy === "latest"
        ? b.datePosted.localeCompare(a.datePosted)
        : a.datePosted.localeCompare(b.datePosted)
    );

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="p-3">Title</th>
            <th className="p-3">Category</th>
            <th className="p-3">Date Posted</th>
            <th className="p-3">Status</th>
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.id} className="border-b hover:bg-gray-50 transition">
              <td className="p-3 font-medium">{item.title}</td>
              <td className="p-3">{item.category}</td>
              <td className="p-3">{item.datePosted}</td>
              <td className="p-3 capitalize">{item.status}</td>
              <td className="p-3 text-right flex justify-end gap-2">
                <button
                  onClick={() => onView(item.id)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onEdit(item.id)}
                  className="text-green-600 hover:text-green-800"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AnnouncementTable;
