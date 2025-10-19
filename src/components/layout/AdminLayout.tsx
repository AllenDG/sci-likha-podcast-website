// src/components/layout/AdminLayout.tsx
import { Outlet } from "react-router-dom";
import AdminSidebar from "@/components/shared/AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <main className="flex-1 bg-gray-100 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
