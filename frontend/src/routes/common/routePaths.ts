export const isAuth = (pathname: string): boolean => {
  return Object.values(AUTH_ROUTES).includes(pathname);
};

export const AUTH_ROUTES = {
  LANDING: "/",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  CONFIRM_ACCOUNT: "/confirm-account",
};

export const PROTECTED_ROUTES = {
  WORKSPACE_SETTINGS : "/:workspaceSlug/settings" ,
  DASHBOARD: "/dashboard",
  PROFILE: "/profile",
  WORKSPACE: "/:workspaceId"
};

export const BASE_ROUTES = {
  random: "/random",
};
