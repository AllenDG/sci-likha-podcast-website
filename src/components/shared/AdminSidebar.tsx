// src/components/shared/AdminSidebar.tsx
import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <aside className="w-64 bg-white shadow-md p-6 space-y-6">
      <h2 className="text-xl font-semibold text-blue-600 mb-4">Admin Panel</h2>
      <ul className="space-y-4">
        <li>
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "text-gray-700"
            }
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/content-management"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "text-gray-700"
            }
          >
            Content Management
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/announcement-management"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "text-gray-700"
            }
          >
            Announcement Management
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default AdminSidebar;
