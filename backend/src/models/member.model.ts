import mongoose, { Schema, Document } from "mongoose";
import { MemberStatus } from "../enums/member-status.enum";
import { Roles, RoleType } from "../enums/role.enum";

export interface MemberDocument extends Document {
  userId: Schema.Types.ObjectId;
  workspaceId: Schema.Types.ObjectId;
  role: RoleType;
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
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      // index: true, // optional, helps queries by user
    },
    workspaceId: {
      type: Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
      // index: true, // optional, helps queries by workspace
    },
    role: {
      type: String,
      required: true,
      trim: true,
      enum: Object.values(Roles),
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
  }
);

// ✅ Compound unique index to prevent duplicate members in the same workspace
memberSchema.index({ userId: 1, workspaceId: 1 }, { unique: true });

const MemberModel = mongoose.model<MemberDocument>("Member", memberSchema);

export default MemberModel;
