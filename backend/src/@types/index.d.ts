// src/types/index.d.ts
import { Types } from "mongoose";
import { File as MulterFile } from "multer"; 

declare global {
  namespace Express {
    interface Request {
      user?: string | Types.ObjectId;
      file?: MulterFile; // multer's File type
      files?: MulterFile[] | { [fieldname: string]: MulterFile[] }; 
    }
  }
}
