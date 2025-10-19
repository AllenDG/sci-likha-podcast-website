// src/pages/admin/dashboard/components/EmailLogSection.tsx
import { Mail, CheckCircle2 } from "lucide-react";

export default function EmailLogSection() {
  const emailRegistrations = [
    {
      id: 1,
      email: "JohnDoe07@userEmail.com",
      message: "This User Has Registered The Email Account...",
      timestamp: "2 hours ago",
      status: "verified",
    },
    {
      id: 2,
      email: "JohnDoe07@userEmail.com",
      message: "This User Has Registered The Email Account...",
      timestamp: "5 hours ago",
      status: "verified",
    },
    {
      id: 3,
      email: "JohnDoe07@userEmail.com",
      message: "This User Has Registered The Email Account...",
      timestamp: "1 day ago",
      status: "verified",
    },
    {
      id: 4,
      email: "JohnDoe07@userEmail.com",
      message: "This User Has Registered The Email Account...",
      timestamp: "2 days ago",
      status: "verified",
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Recent Registrations
        </h3>
        <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
          View All
        </button>
      </div>

      {/* Email List */}
      <div className="space-y-3">
        {emailRegistrations.map((registration) => (
          <div
            key={registration.id}
            className="p-4 border border-gray-200 rounded-lg hover:border-emerald-200 hover:bg-emerald-50/30 transition-all duration-200 group"
          >
            <div className="flex items-start gap-3">
              {/* Icon */}
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-200 transition-colors">
                <Mail className="w-5 h-5 text-emerald-600" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-sm font-semibold text-gray-900 truncate">
                    {registration.email}
                  </h4>
                  {registration.status === "verified" && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-2 line-clamp-1">
                  {registration.message}
                </p>
                <span className="text-xs text-gray-500">
                  {registration.timestamp}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
