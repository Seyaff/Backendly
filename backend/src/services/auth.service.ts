import mongoose from "mongoose";
import { LoginDTO, RegisterDTO } from "../interfaces/auth.interface";
import UserModel from "../models/user.model";
import { BadRequestException, NotFoundException } from "../utils/appError";
import AccountModel from "../models/account.model";
import { ProviderEnum } from "../enums/account-provider.eunm";
import { JwtSigninTokenOptions, signJwt } from "../utils/jwt";

export const registerService = async (body: RegisterDTO) => {
  const { name, email, password } = body;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const existingUser = await UserModel.findOne({ email }).session(session);
    if (existingUser) {
      throw new BadRequestException("Account already exists with this email");
    }

    const user = new UserModel({ name, email, password });
    await user.save({ session });

    const account = new AccountModel({
      provider: ProviderEnum.EMAIL,
      providerId: email,
      userId: user._id,
    });
    await account.save({ session });

    await session.commitTransaction();

    const newUser = user.omitPassword();

    const authToken = signJwt(
      {
        userId: user._id,
      },
      JwtSigninTokenOptions
    );

    return {
      user: newUser,
      authToken,
    };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

export const loginService = async (body: LoginDTO) => {
  const { email, password } = body;

  const account = await AccountModel.findOne({
    provider: ProviderEnum.EMAIL,
    providerId: email,
  });

  if (!account) {
    throw new NotFoundException("No account found with this email");
  }

  const user = await UserModel.findById(account.userId);
  if (!user) {
    throw new NotFoundException("User not found");
  }

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new BadRequestException("Invalid credentials");
  }

  const authToken = signJwt(
    {
      userId: user._id,
    },
    JwtSigninTokenOptions
  );

  return {
    user: user.omitPassword(),
    authToken,
  };
};
