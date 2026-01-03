import useAuth from "@/hooks/api/useAuth";
import Dashboard from "@/pages/dashboard/Dashboard";
import { Navigate, Outlet } from "react-router-dom";

const ProctectedRoute = () => {
  const { data: authData, isLoading } = useAuth();
  const user = authData?.user
  if (isLoading) {
    return <Dashboard />;
  }

  return user ? <Outlet /> : <Navigate to={"/sign-up"} replace />;
};

export default ProctectedRoute;
