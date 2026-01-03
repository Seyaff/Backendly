import mongoose from "mongoose";
import { config } from "./app.config";

export const connectDatabase = async () => {
  try {
    const connection = await mongoose.connect(config.MONGO_URI);
    console.log(`🟢 Successfully connected to Mongo Database`);
  } catch (error) {
    console.log(`🔴 Error connecting to Mongo Database : ${error}`);
    process.exit(1);
  }
};
