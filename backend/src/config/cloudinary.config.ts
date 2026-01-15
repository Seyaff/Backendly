import "dotenv/config";
import multer , { FileFilterCallback } from "multer";
import { Request } from "express";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { config } from "./app.config";

cloudinary.config({
  cloud_name: config.CLOUDINARY_CLOUD_NAME,
  api_key: config.CLOUDINARY_CLOUD_API,
  api_secret: config.CLOUDINARY_API_SECRET,
});

const STORAGE_PARAMS = {
  folder: "images",
  allowed_formats: ["jpg", "png", "jpeg", "webp"],
  transformation: [{ width: 300, height: 300, crop: "fill" }],
  resource_type: "image" as const,
  quality: "auto:good" as const,
};

const storage = new CloudinaryStorage({
  cloudinary,
  params: STORAGE_PARAMS,
});

export const upload = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024,
    files: 1,
  },
  fileFilter(
    req: Request,
    file: Express.Multer.File,
    callback: FileFilterCallback
  ) {
    const isValid = /^image\/(jpe?g|png|webp)$/.test(file.mimetype);

    if (!isValid) {
      return callback(new Error("Only image files are allowed"));
    }

    callback(null, true);
  },
});
