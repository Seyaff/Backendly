import Signin from "@/pages/auth/Signin";
import { AUTH_ROUTES, BASE_ROUTES, PROTECTED_ROUTES } from "./routePaths";
import Signup from "@/pages/auth/Signup";
import Dashboard from "@/pages/dashboard/Dashboard";
import Landing from "@/pages/dashboard/Landing";
import Profile from "@/pages/dashboard/Profile";
import ConfirmAccount from "@/pages/auth/ConfirmAccount";

export const authenticationRoutePaths = [
  { path: AUTH_ROUTES.LANDING, element: <Landing /> },
  { path: AUTH_ROUTES.SIGN_IN, element: <Signin /> },
  { path: AUTH_ROUTES.SIGN_UP, element: <Signup /> },
  { path: AUTH_ROUTES.CONFIRM_ACCOUNT, element: <ConfirmAccount /> },
];

export const protectedRoutePaths = [
  { path: PROTECTED_ROUTES.DASHBOARD, element: <Dashboard /> },
  {
    path: PROTECTED_ROUTES.PROFILE,
    element: <Profile />,
  },
];

export const baseRoutePaths = [
  { path: BASE_ROUTES.random, element: <div>Random Page</div> },
];
