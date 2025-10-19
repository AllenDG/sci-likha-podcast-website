// src/pages/admin/dashboard/components/CardCountSection.tsx
import { Upload, TrendingUp } from "lucide-react";

export default function CardCountSection() {
  const stats = [
    {
      id: 1,
      title: "Total Episode Uploaded",
      value: "10",
      icon: Upload,
      trend: "+2 this month",
    },
    {
      id: 2,
      title: "Total Episode Uploaded",
      value: "10",
      icon: Upload,
      trend: "+2 this month",
    },
    {
      id: 3,
      title: "Total Episode Uploaded",
      value: "10",
      icon: Upload,
      trend: "+2 this month",
    },
    {
      id: 4,
      title: "Total Episode Uploaded",
      value: "10",
      icon: Upload,
      trend: "+2 this month",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.id}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-2">{stat.title}</p>
                <h3 className="text-4xl font-bold text-gray-900">
                  {stat.value}
                </h3>
              </div>
              <div className="w-12 h-12 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
                <Icon className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-emerald-600">
              <TrendingUp className="w-3 h-3" />
              <span>{stat.trend}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
