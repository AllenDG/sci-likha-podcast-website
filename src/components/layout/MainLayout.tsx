// src/components/layout/MainLayout.tsx
import { Outlet } from "react-router-dom";
import MainNavbar from "@/components/shared/MainNavbar";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#F4F4F4] text-gray-900">
      <MainNavbar />

      {/* ---------- MAIN CONTENT ---------- */}
      <main className="flex-1 container mx-auto px-6 py-10">
        <Outlet /> {/* Nested routes: HomePage, AboutPage, ContentPage */}
      </main>

      {/* ---------- FOOTER ---------- */}
      <footer className="bg-gray-200 text-center py-4 text-sm text-gray-600">
        © {new Date().getFullYear()} Dormitory. All rights reserved.
      </footer>
    </div>
  );
};

export default MainLayout;
