import mongoose, { Document, Schema } from "mongoose";
import { ProviderEnum, ProviderEnumType } from "../enums/account-provider.eunm";

export interface AccountDocument extends Document {
  provider: ProviderEnum;
  providerId: string;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
  upadtedAt: Date;
}

const accountSchema = new Schema<AccountDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    provider: {
      type: String,
      enum: Object.values(ProviderEnum),
      required: true,
    },
    providerId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const AccountModel = mongoose.model<AccountDocument>("Account", accountSchema);
export default AccountModel;
