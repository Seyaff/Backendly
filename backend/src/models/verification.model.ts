import mongoose, { Schema } from "mongoose";
import { Document } from "mongoose";
import { generateUniqueCode } from "../utils/verificationCode";
import { VerificationEnum } from "../enums/verification-code.enum";
import { fortyFiveMinutesFromNow } from "../utils/date-fns";

export interface VerificationDocument extends Document {
  userId: Schema.Types.ObjectId;
  code: string;
  type: VerificationEnum;
  expires: Date;
  createdAt: Date;
  updatedAt: Date;
}

const verificationSchema = new Schema<VerificationDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: "User",
    },
    code: {
      type: String,
      unique: true,
      required: true,
      default: generateUniqueCode,
    },
    type: {
      type: String,
      required: true,
    },
    expires: {
      type: Date,
      default: fortyFiveMinutesFromNow(45),
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const verificationCodeModel = mongoose.model(
  "Verification_Code",
  verificationSchema
);
export default verificationCodeModel;
