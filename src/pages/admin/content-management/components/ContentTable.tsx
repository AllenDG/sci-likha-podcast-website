import { useState, useMemo } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
} from "lucide-react";
import type { ContentItem } from "../ContentManagement";

interface ContentTableProps {
  data: ContentItem[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
  searchQuery: string;
  selectedCategory: string;
  sortBy: string;
}

const ContentTable = ({
  data,
  currentPage,
  setCurrentPage,
  onEdit,
  onDelete,
  onView,
  searchQuery,
  selectedCategory,
  sortBy,
}: ContentTableProps) => {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const itemsPerPage = 10;

  // Filter and sort data
  const filteredData = useMemo(() => {
    let filtered = data;

    if (searchQuery) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.episode_id.includes(searchQuery) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === "latest") {
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      } else if (sortBy === "oldest") {
        return (
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
      } else if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

    return sorted;
  }, [data, searchQuery, selectedCategory, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const getPaginationRange = () => {
    const range = [];
    const showPages = 5;

    if (totalPages <= showPages) {
      for (let i = 1; i <= totalPages; i++) {
        range.push(i);
      }
    } else {
      if (currentPage <= 3) {
        range.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        range.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        range.push(1, "...", currentPage, "...", totalPages);
      }
    }

    return range;
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-fixed">
          <colgroup>
            <col className="w-[12%]" />
            <col className="w-[28%]" />
            <col className="w-[18%]" />
            <col className="w-[15%]" />
            <col className="w-[12%]" />
            <col className="w-[15%]" />
          </colgroup>
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
            <tr>
              <th className="px-6 py-5 text-left">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                  Episode ID
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
              </th>
              <th className="px-6 py-5 text-left text-sm font-semibold text-gray-900">
                Title
              </th>
              <th className="px-6 py-5 text-left text-sm font-semibold text-gray-900">
                Category
              </th>
              <th className="px-6 py-5 text-left text-sm font-semibold text-gray-900">
                Release Date
              </th>
              <th className="px-6 py-5 text-left text-sm font-semibold text-gray-900">
                Type
              </th>
              <th className="px-6 py-5 text-center text-sm font-semibold text-gray-900">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {currentData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-5">
                  <div className="flex items-center">
                    <span className="text-xs font-semibold text-gray-900 bg-gray-100 px-3 py-2 rounded-full whitespace-nowrap">
                      {item.episode_id}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="text-sm text-gray-900 font-medium line-clamp-2">
                    {item.title}
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center">
                    <span className="text-xs text-gray-700 bg-emerald-50 px-3 py-2 rounded-full whitespace-nowrap font-medium">
                      {item.category}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="text-sm text-gray-600 whitespace-nowrap">
                    {item.created_at}
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center">
                    <span
                      className={`px-3 py-2 rounded-full text-xs font-semibold whitespace-nowrap ${
                        item.type === "episode"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-purple-100 text-purple-700"
                      }`}
                    >
                      {item.type === "episode" ? "Episode" : "Gallery"}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center justify-center">
                    <div className="relative">
                      <button
                        onClick={() =>
                          setOpenMenuId(openMenuId === item.id ? null : item.id)
                        }
                        className="p-2 hover:bg-gray-100 rounded-xl transition-all hover:shadow-sm"
                      >
                        <MoreVertical className="w-5 h-5 text-gray-600" />
                      </button>

                      {openMenuId === item.id && (
                        <>
                          <div
                            className="fixed inset-0 z-10"
                            onClick={() => setOpenMenuId(null)}
                          />
                          <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-2xl border border-gray-200 py-2 z-20 overflow-hidden">
                            <button
                              onClick={() => {
                                onView(item.id);
                                setOpenMenuId(null);
                              }}
                              className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-blue-50 flex items-center gap-3 transition-colors group"
                            >
                              <div className="w-9 h-9 bg-blue-100 group-hover:bg-blue-200 rounded-xl flex items-center justify-center transition-colors">
                                <Eye className="w-4 h-4 text-blue-600" />
                              </div>
                              <span className="font-medium">View Details</span>
                            </button>
                            <button
                              onClick={() => {
                                onEdit(item.id);
                                setOpenMenuId(null);
                              }}
                              className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-emerald-50 flex items-center gap-3 transition-colors group"
                            >
                              <div className="w-9 h-9 bg-emerald-100 group-hover:bg-emerald-200 rounded-xl flex items-center justify-center transition-colors">
                                <Edit className="w-4 h-4 text-emerald-600" />
                              </div>
                              <span className="font-medium">Edit Content</span>
                            </button>
                            <div className="border-t border-gray-100 my-2" />
                            <button
                              onClick={() => {
                                onDelete(item.id);
                                setOpenMenuId(null);
                              }}
                              className="w-full px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors group"
                            >
                              <div className="w-9 h-9 bg-red-100 group-hover:bg-red-200 rounded-xl flex items-center justify-center transition-colors">
                                <Trash2 className="w-4 h-4 text-red-600" />
                              </div>
                              <span className="font-medium">Delete</span>
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-5 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing{" "}
            <span className="font-semibold text-gray-900">
              {startIndex + 1}
            </span>{" "}
            to{" "}
            <span className="font-semibold text-gray-900">
              {Math.min(endIndex, filteredData.length)}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-900">
              {filteredData.length}
            </span>{" "}
            results
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="group px-4 py-2.5 text-sm font-medium bg-white hover:bg-gray-50 text-gray-700 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-2 border border-gray-200 shadow-sm disabled:hover:bg-white"
            >
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              <span>Previous</span>
            </button>

            <div className="flex items-center gap-1.5">
              {getPaginationRange().map((page, index) => (
                <button
                  key={index}
                  onClick={() =>
                    typeof page === "number" && setCurrentPage(page)
                  }
                  disabled={page === "..."}
                  className={`min-w-[42px] h-[42px] px-3 text-sm font-semibold rounded-xl transition-all ${
                    page === currentPage
                      ? "bg-gradient-to-br from-emerald-600 to-emerald-700 text-white shadow-lg shadow-emerald-500/30 scale-105"
                      : page === "..."
                      ? "text-gray-400 cursor-default bg-transparent"
                      : "text-gray-700 bg-white hover:bg-gray-50 border border-gray-200 shadow-sm hover:shadow hover:scale-105"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="group px-4 py-2.5 text-sm font-medium bg-white hover:bg-gray-50 text-gray-700 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-2 border border-gray-200 shadow-sm disabled:hover:bg-white"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentTable;
