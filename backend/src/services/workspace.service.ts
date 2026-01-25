import { Types } from "mongoose";
import WorkspaceModel from "../models/workspace.model";
import { BadRequestException, NotFoundException } from "../utils/appError";
import {
  createWorkspaceDto,
  EditWorkspaceDTO,
} from "../interfaces/workspace.interface";
import { Roles } from "../enums/role.enum";
import UserModel from "../models/user.model";
import RoleModel from "../models/role.model";
import MemberModel from "../models/member.model";
import { MemberStatus } from "../enums/member-status.enum";

export const getAllWorkspacesService = async (
  userId: string | Types.ObjectId | undefined,
) => {
  const ownerId = userId;
  const workspaces = await WorkspaceModel.find({ owner: ownerId });
  if (workspaces.length === 0) {
    throw new NotFoundException("No workspaces found . Please create one !");
  }
  return { workspaces };
};

export const createNewWorkspaceService = async (
  body: createWorkspaceDto,
  userId: string | Types.ObjectId | undefined,
) => {
  const { name, description, icon, visibility } = body;

  const ownerId = userId;

  const user = await UserModel.findById(userId);

  if (!user) {
    throw new NotFoundException("User not found");
  }

  const ownerRole = await RoleModel.findOne({ name: Roles.OWNER });

  if (!ownerRole) {
    throw new NotFoundException("Owner role not found");
  }

  const newWorkspace = new WorkspaceModel({
    owner: ownerId,
    name,
    description,
    icon,
    visibility,
    members: {
      user: ownerId,
      role: ownerRole._id,
    },
  });

  await newWorkspace.save();

  const member = new MemberModel({
    userId: ownerId,
    workspaceId: newWorkspace._id,
    role: ownerRole._id,
    status: MemberStatus.ACTIVE,
  });

  await member.save();

  return { newWorkspace };
};

export const editWorkspaceService = async (
  body: EditWorkspaceDTO,
  userId: string | Types.ObjectId | undefined,
  workspaceSlug: string,
) => {
  const { name, description, icon } = body;
  const workspace = await WorkspaceModel.findOne({
    owner: userId,
    slug: workspaceSlug,
  });

  if (!workspace) {
    throw new NotFoundException("Workspace not found");
  }

  if (
    workspace.name === name ||
    workspace.description === description ||
    workspace.icon === icon
  ) {
    throw new BadRequestException("Please enter new values");
  }

  workspace.name = name || workspace.name;
  workspace.description = description || workspace.description;
  workspace.icon = icon || workspace.icon;
  await workspace.save();

  return { workspace };
};

export const getWorkspaceByIdService = async (
  userId: string | Types.ObjectId | undefined,
  slug: string,
) => {
  if (!slug) {
    throw new NotFoundException("Workspace ID is required");
  }

  const workspace = await WorkspaceModel.findOne({ slug });
  if (!workspace) {
    throw new NotFoundException("Workspace not found");
  }

  const members = await MemberModel.find({ userId: userId }).populate("role");

  const workspaceWithMembers = {
    ...workspace.toObject(),
    members,
  };

  return { workspace: workspaceWithMembers };
};
