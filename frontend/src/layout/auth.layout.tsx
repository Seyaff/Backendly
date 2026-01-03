import useAuth from "@/hooks/api/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const { data: authData, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-svh items-center justify-center">
        Loading...
      </div>
    );
  }

  if (authData?.user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default AuthLayout;
