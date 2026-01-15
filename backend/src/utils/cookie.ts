import { CookieOptions, Response } from "express";
import { config } from "../config/app.config";
import { calculateExpirationDate } from "./date-fns";

type CookiePayloadType = {
  res: Response;
  authToken: string;
};

const baseCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: config.NODE_ENV === "production", // HTTPS only in prod
  sameSite: "none", // REQUIRED for cross-origin auth
  path: "/",
};

export const getCookieOptions = (): CookieOptions => {
  return {
    ...baseCookieOptions,
    expires: calculateExpirationDate(config.JWT.EXPIRES_IN),
  };
};

export const setAuthenticationCookies = ({
  res,
  authToken,
}: CookiePayloadType): Response => {
  return res.cookie("auth", authToken, getCookieOptions());
};

export const clearAuthenticationCookies = (res: Response): Response => {
  return res.clearCookie("auth", getCookieOptions());
};
