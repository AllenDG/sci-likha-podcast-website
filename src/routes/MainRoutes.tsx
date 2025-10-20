// src/routes/MainRoutes.tsx
import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import ProtectedRoute from "@/components/shared/ProtectedRoute";

// Layouts
const MainLayout = lazy(() => import("@/components/layout/MainLayout"));
const AdminLayout = lazy(() => import("@/components/layout/AdminLayout"));

// Main (public) pages
const HomePage = lazy(() => import("@/pages/main/home/HomePage"));
const ContentPage = lazy(() => import("@/pages/main/content/ContentPage"));
const AboutPage = lazy(() => import("@/pages/main/about/AboutPage"));

// Admin pages
const AdminDashboard = lazy(
  () => import("@/pages/admin/dashboard/AdminDashboard")
);
const ContentManagement = lazy(
  () => import("@/pages/admin/content-management/ContentManagement")
);
const AnnouncementManagement = lazy(
  () => import("@/pages/admin/announcement-management/AnnouncementManagementPage")
);
const Login = lazy(() => import("@/pages/shared/LoginPage"));
const NotFound = lazy(() => import("@/pages/shared/NotFoundPage"));

const LoadingScreen = () => <div className="text-center p-10">Loading...</div>;

export const MainRoutes = createBrowserRouter([
  // PUBLIC (User)
  {
    path: "/",
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <MainLayout />
      </Suspense>
    ),
    children: [
      { index: true, element: <HomePage /> },
      { path: "content", element: <ContentPage /> },
      { path: "about", element: <AboutPage /> },
    ],
  },

  // ADMIN (Protected)
  {
    path: "/admin",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <Suspense fallback={<LoadingScreen />}>
          <AdminLayout />
        </Suspense>
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "content-management", element: <ContentManagement /> },
      { path: "announcement-management", element: <AnnouncementManagement /> },
      { path: "*", element: <Navigate to="/admin" replace /> },
    ],
  },

  // LOGIN & NOT FOUND
  {
    path: "/login",
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <NotFound />
      </Suspense>
    ),
  },
]);
