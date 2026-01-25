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
import WorkspaceModel from "../models/workspace.model";
import MemberModel from "../models/member.model";
import { Roles } from "../enums/role.enum";
import { MemberStatus } from "../enums/member-status.enum";
import RoleModel from "../models/role.model";

export const registerService = async (body: RegisterDTO  , file : string) => {
  const { name, email, password } = body;
  const profilePicture = file

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const existingUser = await UserModel.findOne({ email }).session(session);
    if (existingUser) {
      throw new BadRequestException("Account already exists with this email");
    }

    const user = new UserModel({ name, email, password , profilePicture });
     const ownerRole = await RoleModel.findOne({name : Roles.OWNER})
    if(!ownerRole) {
      throw new NotFoundException("Owner role not found")
    }

    const account = new AccountModel({
      provider: ProviderEnum.EMAIL,
      providerId: email,
      userId: user._id,
    });

    await account.save({ session });

    const workspace = new WorkspaceModel({
      owner: user._id,
      name: "New Workspace",
      description: "This is the first workspace being made in this account",
      members: {
        user: user._id,
        role : ownerRole._id
      },
    });

    await workspace.save({ session });

   

    const member = new MemberModel({
      userId: user._id,
      workspaceId: workspace._id,
      role : ownerRole._id,
      status : MemberStatus.ACTIVE
    });



    await member.save({ session });

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
    user.currentWorkspaceSlug = workspace.slug
    await user.save({session})
    

    await session.commitTransaction();
    return {
      user: newUser,
      workspace,
      member
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

  if (!user.isEmailVerified) {
    const verificationCode = new verificationCodeModel({
      userId: user._id,
      type: VerificationEnum.EMAIL_VERIFICATION,
    });

    await verificationCode.save();

    const verificationUrl = `${config.FRONTEND_ORIGIN}/confirm-account?code=${verificationCode.code}`;

    await sendEmail({
      to: user.email,
      ...verifyEmailTemplate(verificationUrl),
    });

    throw new BadRequestException(
      "Email not verified ! Please verify your email"
    );
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

  if (user.isEmailVerified) {
    throw new BadRequestException(
      "Email is already verified . Please continue to dashboard"
    );
  }

  user.isEmailVerified = true;

  await user.save();
  await validCode.deleteOne();
  await user.save();

  const authToken = signJwt(
    {
      userId: user._id,
    },
    JwtSigninTokenOptions
  );

  return {
    authToken,
  };
};
