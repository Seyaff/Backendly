import AuthLayout from "@/layout/auth.layout";
import BaseLayout from "@/layout/base.layout";
import { Route, Routes } from "react-router-dom";
import {
  authenticationRoutePaths,
  baseRoutePaths,
  protectedRoutePaths,
} from "./common/routes";
import ProctectedRoute from "./protected.route";
import NotFound from "@/pages/errors/NotFound";
import AppLayout from "@/layout/app.layout";


const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route element={<BaseLayout />}>
        {baseRoutePaths.map((route) => (
          <Route key={route.path} {...route} />
        ))}
      </Route>

      {/* Auth routes (no BaseLayout) */}
      <Route element={<AuthLayout />}>
        {authenticationRoutePaths.map((route) => (
          <Route key={route.path} {...route} />
        ))}
      </Route>

      {/* Protected routes */}
      <Route element={<ProctectedRoute />}>
        <Route element={<AppLayout />}>
          {protectedRoutePaths.map((route) => (
            <Route key={route.path} {...route} />
          ))}
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
