// src/pages/admin/dashboard/AdminDashboard.tsx
import BannerSection from "./components/BannerSection";
import CardCountSection from "./components/CardCountSection";
import VideoStatSection from "./components/VideoStatSection";
import EmailLogSection from "./components/EmailLogSection";
import LatestPostSection from "./components/LatestPostSection";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto space-y-6">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        </div>

        {/* Banner Section */}
        <BannerSection />

        {/* Card Counts Section */}
        <CardCountSection />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Video Stats & Email List */}
          <div className="lg:col-span-2 space-y-6">
            <VideoStatSection />
            <EmailLogSection />
          </div>

          {/* Right Column - Latest Posts */}
          <div className="lg:col-span-1">
            <LatestPostSection />
          </div>
        </div>
      </div>
    </div>
  );
}
