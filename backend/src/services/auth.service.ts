import mongoose from "mongoose";
import { LoginDTO, RegisterDTO } from "../interfaces/auth.interface";
import UserModel from "../models/user.model";
import { BadRequestException, NotFoundException } from "../utils/appError";
import AccountModel from "../models/account.model";
import { ProviderEnum } from "../enums/account-provider.eunm";
import { JwtSigninTokenOptions, signJwt } from "../utils/jwt";
import verificationCodeModel from "../models/verification.model";
import { VerificationEnum } from "../enums/verification-code.enum";
import { sendEmail } from "../mailers/mailer";
import { verifyEmailTemplate } from "../mailers/templates";
import { config } from "../config/app.config";

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

    const userId = user._id;

    const verificationCode = new verificationCodeModel({
      userId,
      type: VerificationEnum.EMAIL_VERIFICATION,
    });

    await verificationCode.save({ session });

    const verificationUrl = `${config.FRONTEND_ORIGIN}/confirm-account?code=${verificationCode.code}`;

    await sendEmail({
      to: user.email,
      ...verifyEmailTemplate(verificationUrl),
    });

    const newUser = user.omitPassword();

    await session.commitTransaction();
    return {
      user: newUser,
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

export const verifyAccountService = async (code: string) => {
  const validCode = await verificationCodeModel.findOne({
    code,
    type: VerificationEnum.EMAIL_VERIFICATION,
  });
  if (!validCode) {
    throw new BadRequestException("Expired or invalid code");
  }

  const user = await UserModel.findOne({ _id: validCode.userId });

  if (!user) {
    throw new NotFoundException("User not found with associated email");
  }

  if(user.isEmailVerified) {
    throw new BadRequestException("Email is already verified . Please continue to dashboard")
  }

  
  user.isEmailVerified = true;

  await user.save();
  await validCode.deleteOne();
  await user.save()


    const authToken = signJwt(
    {
      userId: user._id,
    },
    JwtSigninTokenOptions
  );






  return{
    authToken
  }
};
