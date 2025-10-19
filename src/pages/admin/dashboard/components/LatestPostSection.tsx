// src/pages/admin/dashboard/components/LatestPostSection.tsx
import { Clock, Eye } from "lucide-react";

export default function LatestPostSection() {
  const posts = [
    {
      id: 1,
      title: "Accumsan pen atibus ultricies",
      description:
        "Porttitor odio quam est. nec. Venenatis viverra aliquet sit...",
      thumbnail: "/api/placeholder/400/300",
      duration: "12:00",
      views: 14,
    },
    {
      id: 2,
      title: "Accumsan pen atibus ultricies",
      description:
        "Porttitor odio quam est. nec. Venenatis viverra aliquet sit...",
      thumbnail: "/api/placeholder/400/300",
      duration: "12:00",
      views: 14,
    },
    {
      id: 3,
      title: "Accumsan pen atibus ultricies",
      description:
        "Porttitor odio quam est. nec. Venenatis viverra aliquet sit...",
      thumbnail: "/api/placeholder/400/300",
      duration: "12:00",
      views: 14,
    },
    {
      id: 4,
      title: "Accumsan pen atibus ultricies",
      description:
        "Porttitor odio quam est. nec. Venenatis viverra aliquet sit...",
      thumbnail: "/api/placeholder/400/300",
      duration: "12:00",
      views: 14,
    },
    {
      id: 5,
      title: "Accumsan pen atibus ultricies",
      description:
        "Porttitor odio quam est. nec. Venenatis viverra aliquet sit...",
      thumbnail: "/api/placeholder/400/300",
      duration: "12:00",
      views: 14,
    },
  ];

  return (
    <div className="bg-white h-full rounded-xl border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Latest Episodes</h3>
        <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
          View All
        </button>
      </div>

      {/* Posts List */}
      <div className="space-y-4 max-h-[full] overflow-y-auto pr-2 custom-scrollbar">
        {posts.map((post) => (
          <div
            key={post.id}
            className="flex gap-4 p-3 rounded-lg border border-gray-200 hover:border-emerald-200 hover:bg-emerald-50/30 transition-all duration-200 group cursor-pointer"
          >
            {/* Thumbnail */}
            <div className="relative w-28 h-20 flex-shrink-0 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
              {/* Placeholder for image */}
              <div className="w-full h-full flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </div>

              {/* Duration badge */}
              <div className="absolute bottom-2 right-2 bg-black/75 text-white text-xs px-2 py-0.5 rounded">
                <Clock className="w-3 h-3 inline mr-1" />
                {post.duration}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                {post.title}
              </h4>
              <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                {post.description}
              </p>

              {/* Stats */}
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{post.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  <span>{post.views}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
      `}</style>
    </div>
  );
}
