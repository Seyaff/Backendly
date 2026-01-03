import Signin from "@/pages/auth/Signin";
import { AUTH_ROUTES, BASE_ROUTES, PROTECTED_ROUTES } from "./routePaths";
import Signup from "@/pages/auth/Signup";
import Dashboard from "@/pages/dashboard/Dashboard";
import Landing from "@/pages/dashboard/Landing";

export const authenticationRoutePaths = [
  { path: AUTH_ROUTES.LANDING, element: <Landing /> },
  { path: AUTH_ROUTES.SIGN_IN, element: <Signin /> },
  { path: AUTH_ROUTES.SIGN_UP, element: <Signup /> },
];

export const protectedRoutePaths = [
  { path: PROTECTED_ROUTES.DASHBOARD, element: <Dashboard /> },
  {
    path: PROTECTED_ROUTES.RANDOM,
    element: (
      <div>
        This is new-random page which is not identical to the baseRoutepaths one
      </div>
    ),
  },
];

export const baseRoutePaths = [
  { path: BASE_ROUTES.random, element: <div>Random Page</div> },
];
