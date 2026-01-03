export const isAuth = (pathname : string) : boolean => {
    return Object.values(AUTH_ROUTES).includes(pathname)
} 

export const AUTH_ROUTES = {
  LANDING : "/",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
};


export const PROTECTED_ROUTES = {
  DASHBOARD: "/dashboard",
  RANDOM : "/new-random",
};


export const BASE_ROUTES = {
  
  random: "/random",
};