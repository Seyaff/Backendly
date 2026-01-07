import { DashboardSkeleton } from "@/components/skeleton-loaders/dashboard-sekelton";
import useAuth from "@/hooks/api/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const { data: authData, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <DashboardSkeleton />
      </div>
    );
  }

  if (authData?.user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default AuthLayout;
