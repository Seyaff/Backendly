import { Types } from "mongoose";
import UserModel from "../models/user.model";
import { BadRequestException } from "../utils/appError";

export const getCurrentUserService = async (
  userId: string | Types.ObjectId | undefined
) => {
  const user = await UserModel.findById(userId);

  if (!user) {
    throw new BadRequestException("User not found");
  }

  return { user: user.omitPassword() };
};
