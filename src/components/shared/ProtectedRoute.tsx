import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  allowedRoles: string[];
  children?: React.ReactNode;
}

// Dummy auth (replace later with real data from localStorage or API)
const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles,
  children,
}) => {
  const user = getCurrentUser();

  // No user → must log in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but not authorized → redirect to main public page
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // Authorized → allow access
  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
