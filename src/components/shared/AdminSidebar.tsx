import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Megaphone,
  LogOut,
  Menu,
  ChevronLeft,
} from "lucide-react";

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden p-4 text-white bg-green-900"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-screen bg-green-900 text-white flex flex-col transition-all duration-300 z-50 ${
          isOpen ? "w-64" : "w-20"
        }`}
      >
        {/* Collapse Button (Desktop Only) */}
        <div className="hidden md:flex justify-end p-2">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-300 hover:text-white"
          >
            <ChevronLeft
              className={`transition-transform ${isOpen ? "" : "rotate-180"}`}
            />
          </button>
        </div>

        {/* Title / Logo */}
        {isOpen && (
          <div className="px-6 py-2 text-lg font-semibold border-b border-green-700">
            Admin Panel
          </div>
        )}

        {/* Navigation Links */}
        <nav className="flex-1 px-2 py-6 space-y-4">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-2 py-2 rounded-md ${
                isActive
                  ? "bg-green-800 text-white"
                  : "text-gray-300 hover:bg-green-800"
              }`
            }
          >
            <LayoutDashboard size={20} />
            {isOpen && <span>Dashboard</span>}
          </NavLink>

          <NavLink
            to="/admin/content-management"
            className={({ isActive }) =>
              `flex items-center gap-3 px-2 py-2 rounded-md ${
                isActive
                  ? "bg-green-800 text-white"
                  : "text-gray-300 hover:bg-green-800"
              }`
            }
          >
            <FileText size={20} />
            {isOpen && <span>Content Management</span>}
          </NavLink>

          <NavLink
            to="/admin/announcement-management"
            className={({ isActive }) =>
              `flex items-center gap-3 px-2 py-2 rounded-md ${
                isActive
                  ? "bg-green-800 text-white"
                  : "text-gray-300 hover:bg-green-800"
              }`
            }
          >
            <Megaphone size={20} />
            {isOpen && <span>Announcement Management</span>}
          </NavLink>
        </nav>

        {/* Sign Out */}
        <div className="px-4 py-4 border-t border-green-700">
          <NavLink
            to="/logout"
            className="flex items-center gap-3 text-gray-300 hover:text-white"
          >
            <LogOut size={20} />
            {isOpen && <span>Sign Out</span>}
          </NavLink>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
