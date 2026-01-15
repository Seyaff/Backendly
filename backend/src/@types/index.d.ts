import { Types } from "mongoose";
import { Multer } from "multer";

declare global {
  namespace Express {
    interface Request {
      user?: string | Types.ObjectId;
      file?: Multer.File;pe
    }
  }
}
