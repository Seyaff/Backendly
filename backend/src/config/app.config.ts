import { getEnv } from "../utils/getEnv";

const appConfig = () => ({
  NODE_ENV: getEnv("NODE_ENV", "development"),
  PORT: getEnv("PORT", "5000"),
  BASE_PATH: getEnv("BASE_PATH", "/api/v1"),
  MONGO_URI: getEnv("MONGO_URI", ""),

  JWT: {
    SECRET: getEnv("SECRET"),
    EXPIRES_IN: getEnv("EXPIRES_IN"),
  },
  MAILER_SENDER: getEnv("MAILER_SENDER"),
  RESEND_API_KEY: getEnv("RESEND_API_KEY"),

  //   GOOGLE_CLIENT_ID: getEnv("GOOGLE_CLIENT_ID"),
  //   GOOGLE_CLIENT_SECRET: getEnv("GOOGLE_CLIENT_SECRET"),
  //   GOOGLE_CALLBACK_URL: getEnv("GOOGLE_CALLBACK_URL"),


  CLOUDINARY_CLOUD_NAME: getEnv("CLOUDINARY_CLOUD_NAME"),
  CLOUDINARY_CLOUD_API: getEnv("CLOUDINARY_CLOUD_API"),
  CLOUDINARY_API_SECRET: getEnv("CLOUDINARY_API_SECRET"),

  FRONTEND_ORIGIN: getEnv("FRONTEND_ORIGIN", "localhost"),
  //   FRONTEND_GOOGLE_CALLBACK_URL: getEnv("FRONTEND_GOOGLE_CALLBACK_URL"),
});

export const config = appConfig();
