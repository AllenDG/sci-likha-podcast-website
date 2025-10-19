// src/pages/admin/dashboard/components/VideoStatSection.tsx
import { useState } from "react";
import { TrendingUp } from "lucide-react";

type TimeRange = "Daily" | "Weekly" | "Annually";

export default function VideoStatSection() {
  const [selectedRange, setSelectedRange] = useState<TimeRange>("Annually");

  // Sample data points for the chart
  const dataPoints = [
    { month: "JAN", value: 3500 },
    { month: "FEB", value: 2800 },
    { month: "MAR", value: 4200 },
    { month: "APR", value: 3200 },
    { month: "MAY", value: 4800 },
    { month: "JUN", value: 3800 },
    { month: "JUL", value: 4500 },
    { month: "AUG", value: 3300 },
    { month: "SEP", value: 4100 },
    { month: "OCT", value: 3600 },
    { month: "NOV", value: 4400 },
    { month: "DEC", value: 3900 },
  ];

  const maxValue = Math.max(...dataPoints.map((d) => d.value));

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            Annually Views
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-emerald-600">16</span>
            <div className="flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
              <TrendingUp className="w-3 h-3" />
              <span>12%</span>
            </div>
          </div>
        </div>

        {/* Time Range Selector */}
        <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
          {(["Daily", "Weekly", "Annually"] as TimeRange[]).map((range) => (
            <button
              key={range}
              onClick={() => setSelectedRange(range)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedRange === range
                  ? "bg-emerald-700 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="relative h-64">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-xs text-gray-500">
          <span>5k</span>
          <span>4k</span>
          <span>3k</span>
          <span>2k</span>
          <span>1k</span>
          <span>0</span>
        </div>

        {/* Chart area */}
        <div className="ml-8 h-full flex items-end justify-between gap-1 pb-8">
          {dataPoints.map((point, index) => {
            const heightPercentage = (point.value / maxValue) * 100;
            const isHighlighted = index === 7; // Highlight AUG

            return (
              <div
                key={point.month}
                className="flex-1 flex flex-col items-center group relative"
              >
                {/* Tooltip */}
                {isHighlighted && (
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-emerald-800 text-white px-3 py-1.5 rounded-lg text-xs font-medium shadow-lg whitespace-nowrap">
                    {point.value.toLocaleString()} Views
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-emerald-800"></div>
                  </div>
                )}

                {/* Bar */}
                <div
                  className="w-full bg-gradient-to-t from-emerald-200 to-emerald-400 rounded-t-md transition-all duration-300 hover:from-emerald-300 hover:to-emerald-500 cursor-pointer relative overflow-hidden"
                  style={{ height: `${heightPercentage}%` }}
                >
                  {/* Animated shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Vertical line for highlighted month */}
                {isHighlighted && (
                  <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px bg-emerald-800 opacity-20"
                    style={{ height: "100%" }}
                  ></div>
                )}
              </div>
            );
          })}
        </div>

        {/* X-axis labels */}
        <div className="absolute bottom-0 left-8 right-0 flex justify-between text-xs text-gray-500 font-medium">
          {dataPoints.map((point) => (
            <span key={point.month} className="flex-1 text-center">
              {point.month}
            </span>
          ))}
        </div>

        {/* Grid lines */}
        <div className="absolute left-8 right-0 top-0 bottom-8 pointer-events-none">
          {[0, 1, 2, 3, 4, 5].map((line) => (
            <div
              key={line}
              className="absolute left-0 right-0 border-t border-gray-100"
              style={{ top: `${line * 20}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
