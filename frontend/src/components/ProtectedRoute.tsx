import { Navigate } from "react-router-dom";
import { useProfile } from "../hooks/auth/useProfile";

interface Props {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: Props) => {
  const { data: user, isLoading, isError } = useProfile();

  if (isLoading) return <p className="text-white text-center">Loading...</p>;
  if (isError || !user) return <Navigate to="/login" replace />;

  return <>{children}</>;
};
