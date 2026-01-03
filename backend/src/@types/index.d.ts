import { Types } from "mongoose";

declare global {
  namespace Express {
    interface Request {
      user?: string | Types.ObjectId;
    }
  }
}