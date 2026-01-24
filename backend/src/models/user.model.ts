import mongoose, { Document, HydratedDocument, Schema } from "mongoose";
import { comparePassword, hashValue } from "../utils/bcrypt";

export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  profilePicture?: string;
  isEmailVerified: boolean;
  currentWorkspace: mongoose.Types.ObjectId | null;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(value: string): Promise<boolean>;
  omitPassword(): Omit<UserDocument, "password">;
}

const userSchema = new Schema<UserDocument>(
  {
    name: {
      type: String,
      required: false,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      trim: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
      required: true,
    },
    currentWorkspace: {
      type: Schema.Types.ObjectId,
      ref: "Workspace",
    },
  },
  {
    timestamps: true,
  }
);

// userSchema.pre("save", async function (this: HydratedDocument<UserDocument>) {
//   if (this.isModified("password")) {
//     if (this.password) {
//       this.password = await hashValue(this.password);
//     }
//   }
// });

// userSchema.methods.comparePassword = async function (value: string) {
//   return await comparePassword(value, this.password);
// };

userSchema.methods.omitPassword = function () {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

const UserModel = mongoose.model<UserDocument>("User", userSchema);
export default UserModel;
