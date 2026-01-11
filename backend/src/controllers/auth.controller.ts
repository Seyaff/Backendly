import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { HTTPSTATUS } from "../config/http.config";
import {
  loginSchema,
  registerSchema,
  verificationEmailSchema,
} from "../validation/auth.validation";
import {
  loginService,
  registerService,
  verifyAccountService,
} from "../services/auth.service";
import {
  clearAuthenticationCookies,
  setAuthenticationCookies,
} from "../utils/cookie";

export const registerController = asyncHandler(
  async (req: Request, res: Response) => {
    const body = registerSchema.parse({ ...req.body });

    const { user } = await registerService(body);

    return res.status(HTTPSTATUS.OK).json({
      message: "Account created successfully",
      user,
    });
  }
);

export const loginController = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const body = loginSchema.parse({ ...req.body });

    const { user, authToken } = await loginService(body);

    return setAuthenticationCookies({ res, authToken })
      .status(HTTPSTATUS.OK)
      .json({
        message: "Login successfull",
        user,
      });
  }
);

export const logoutController = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    return clearAuthenticationCookies(res).status(HTTPSTATUS.OK).json({
      message: "Session expired ! Please login",
    });
  }
);

export const verifyAccountController = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { code } = verificationEmailSchema.parse(req.body);

    const { authToken } = await verifyAccountService(code);

    return setAuthenticationCookies({ res, authToken })
      .status(HTTPSTATUS.OK)
      .json({
        message: "Email verified successfully",
      });
  }
);
