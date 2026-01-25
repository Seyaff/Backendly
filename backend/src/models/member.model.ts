import mongoose, { Schema, Document } from "mongoose";
import { MemberStatus } from "../enums/member-status.enum";
import { Roles, RoleType } from "../enums/role.enum";
import { RoleDocument } from "./role.model";
import { Types } from "mongoose";

export interface MemberDocument extends Document {
  userId: Types.ObjectId;
  workspaceId: Types.ObjectId;
  role: RoleDocument;
  status: MemberStatus;
  joinedAt?: Date;
  invitedAt?: Date;
  invitedBy?: Schema.Types.ObjectId;
  lastActiveAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const memberSchema = new Schema<MemberDocument>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      // index: true, // optional, helps queries by user
    },
    workspaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
      // index: true, // optional, helps queries by workspace
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },
    status: {
      type: String,
      required: true,
      trim: true,
      enum: Object.values(MemberStatus),
    },
    joinedAt: {
      type: Date,
      default: Date.now,
    },
    invitedAt: {
      type: Date,
    },
    invitedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    lastActiveAt: {
      type: Date,
    },
  },
  {
    timestamps: true, // createdAt & updatedAt
  },
);

// ✅ Compound unique index to prevent duplicate members in the same workspace
memberSchema.index({ userId: 1, workspaceId: 1 }, { unique: true });

const MemberModel = mongoose.model<MemberDocument>("Member", memberSchema);

export default MemberModel;
