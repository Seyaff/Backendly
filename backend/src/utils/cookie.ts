import { CookieOptions, Response } from "express";
import { config } from "../config/app.config";
import { calculateTimeInMilliseconds } from "./date-fns";

type CookiePayloadType = {
  res: Response;
  authToken: string;
};

const defaults: CookieOptions = {
  httpOnly: true,
  secure: config.NODE_ENV === "production",
  sameSite: "none",
};

export const getCookiOptions = () => {
  const expiresIn = config.JWT.EXPIRES_IN;
  const expires = calculateTimeInMilliseconds(expiresIn);
  return {
    ...defaults,
    expires,
    path: "/",
  };
};

export const setAuthenticationCookies = ({
  res,
  authToken,
}: CookiePayloadType): Response => {
  return res.cookie("auth", authToken, getCookiOptions());
};

export const clearAuthenticationCookies = (res: Response): Response => {
  return res.clearCookie("auth");
};
