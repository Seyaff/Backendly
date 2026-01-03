import { NextFunction, Request, Response } from "express";
import { verifyJwtToken } from "../utils/jwt";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.auth;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized! Please login",
    });
  }

  try {
    const { payload } = verifyJwtToken(token);
    const userId = payload?.userId;

    if (!userId) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }

    req.user = userId;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};
