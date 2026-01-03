import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { HTTPSTATUS } from "../config/http.config";
import { loginSchema, registerSchema } from "../validation/auth.validation";
import { loginService, registerService } from "../services/auth.service";
import { setAuthenticationCookies } from "../utils/cookie";

export const registerController = asyncHandler(
  async (req: Request, res: Response) => {
    const body = registerSchema.parse({ ...req.body });

    const { user, authToken } = await registerService(body);

    return setAuthenticationCookies({ res, authToken })
      .status(HTTPSTATUS.OK)
      .json({
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


