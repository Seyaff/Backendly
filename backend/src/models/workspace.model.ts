import mongoose, { Schema } from "mongoose";
import { Document } from "mongoose";
import { randomInviteCodeGenerator, randomSlugGenerator } from "../utils/uuid";
import { Roles, RoleType } from "../enums/role.enum";
import {
  WorkspaceVisibility,
  WorkspaceVisibilityType,
} from "../enums/visibility.enum";
import {
  DefaultWorkspaceRole,
  DefaultWorkspaceRoleType,
} from "../enums/default-role.enum";
import { TaskPriority, TaskStatus } from "../enums/task.enum";

export interface WorkspaceDocument extends Document {
  owner: Schema.Types.ObjectId;

  name: string;
  description?: string;
  slug: string;
  joinCode: string;

  icon?: string;

  members: {
    user: Schema.Types.ObjectId;
    role: RoleType;
    joinedAt: Date;
  }[];

  settings: {
    allowGuests: boolean;
    defaultRole: DefaultWorkspaceRoleType;
    taskStatuses: string[];
    taskPriorities: string[];
    timezone?: string;
  };

  features: {
    projects: boolean;
    tasks: boolean;
    canvas: boolean;
    workflows: boolean;
  };

  visibility: WorkspaceVisibility;

  createdAt: Date;
  updatedAt: Date;
  lastActivityAt: Date;
}

const workspaceSchema = new Schema<WorkspaceDocument>(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to User model (the workspace creator)
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    slug: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      default: function () {
        const safeName = this.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");

        return `${safeName}-${randomSlugGenerator()}`;
      },
    },

    joinCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      default: randomInviteCodeGenerator,
    },

    icon: {
      type: String,
      trim: true,
      default: "📊",
    },

    members: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        role: {
          type: String,
          enum: Object.values(Roles),
          required: true,
        },
        joinedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    settings: {
      allowGuests: {
        type: Boolean,
        default: false,
      },
      defaultRole: {
        type: String,
        enum: Object.values(DefaultWorkspaceRole),
        default: DefaultWorkspaceRole.MEMBER,
      },
      taskStatuses: {
        type: [String],
        enum: Object.values(TaskStatus),
        default: Object.values(TaskStatus),
      },
      taskPriorities: {
        type: [String],
        enum: Object.values(TaskPriority),
        default: Object.values(TaskPriority),
      },
      timezone: String,
    },

    features: {
      projects: { type: Boolean, default: true },
      tasks: { type: Boolean, default: true },
      canvas: { type: Boolean, default: true },
      workflows: { type: Boolean, default: false },
    },

    visibility: {
      type: String,
      enum: Object.values(WorkspaceVisibility),
      default: WorkspaceVisibility.PRIVATE,
    },

    lastActivityAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const WorkspaceModel = mongoose.model<WorkspaceDocument>(
  "Workspace",
  workspaceSchema
);

export default WorkspaceModel;
