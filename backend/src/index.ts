import "dotenv/config";

import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// Route Paths
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";

// Authenticatin Middleware 
import { isAuthenticated } from "./middlewares/isAuthenticated.middleware";

// Functions
import { config } from "./config/app.config";
import { connectDatabase } from "./config/database.config";
import { asyncHandler } from "./middlewares/asyncHandler.middleware";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { ErrorCodeEnum } from "./enums/error-code.enum";
import { HTTPSTATUS } from "./config/http.config";
import { BadRequestException } from "./utils/appError";

const app = express();
const BASE_PATH = config.BASE_PATH;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: config.FRONTEND_ORIGIN,
    credentials: true,
  })
);

app.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
   res.send("Hey !!!")
  })
);

app.use(`${BASE_PATH}/auth`, authRoutes);
app.use(`${BASE_PATH}/user`, isAuthenticated, userRoutes);

app.use(errorHandler);

app.listen(config.PORT, async () => {
  console.log(
    `🚀 Server running on http://localhost:${config.PORT} in ${config.NODE_ENV}`
  );
  await connectDatabase();
});
