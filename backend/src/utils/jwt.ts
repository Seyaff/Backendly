import jwt, { VerifyOptions } from "jsonwebtoken";

import { SignOptions } from "jsonwebtoken";
import { UserDocument } from "../models/user.model";
import { config } from "../config/app.config";

export type JwtPayload = {
  userId: UserDocument["_id"];
};

type SignOptsAndSecret = SignOptions & {
  secret: string;
};

const defaults: SignOptions = {
  audience: ["user"],
};

export const JwtSigninTokenOptions: SignOptsAndSecret = {
  expiresIn: config.JWT.EXPIRES_IN as any,
  secret: config.JWT.SECRET,
};

export const signJwt = (paylaod: JwtPayload, options?: SignOptsAndSecret) => {
  const { secret, ...opts } = options || JwtSigninTokenOptions;
  return jwt.sign(paylaod, secret, {
    ...defaults,
    ...opts,
  });
};

export const verifyJwtToken = <TPayload extends object = JwtPayload>(
  token: string,
  options?: VerifyOptions & { secret: string }
) => {
  try {
    const { secret = config.JWT.SECRET, ...opts } = options || {};
    const payload = jwt.verify(token, secret)  as TPayload;

    return { payload };
  } catch (err: any) {
    return {
      error: err.message,
    };
  }
};
