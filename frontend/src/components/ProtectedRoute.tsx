import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};
