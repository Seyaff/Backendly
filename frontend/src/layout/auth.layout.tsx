import { DashboardSkeleton } from "@/components/skeleton-loaders/dashboard-sekelton";
import useAuth from "@/hooks/api/useAuth";
import { User } from "lucide-react";
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

  // console.log(authData.user)

  if (!authData?.user) return <Outlet />;

  return <Navigate to={`/${authData?.user.currentWorkspaceSlug}`} replace />;
};

export default AuthLayout;
