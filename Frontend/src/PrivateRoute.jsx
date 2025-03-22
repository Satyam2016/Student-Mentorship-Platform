import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) return <Navigate to="/login" replace />; // If not logged in, redirect to login
  if (!allowedRoles.includes(role)) return <Navigate to="/" replace />; // If unauthorized, redirect to home

  return <Outlet />; // Render nested components if authorized
};

export default PrivateRoute;
