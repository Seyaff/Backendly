import { Types } from "mongoose";
import UserModel from "../models/user.model";
import { NotFoundException, UnauthorizedException } from "../utils/appError";
import WorkspaceModel from "../models/workspace.model";
import MemberModel from "../models/member.model";
import { ErrorCodeEnum } from "../enums/error-code.enum";

export const getMemberRoleInWorkspaceService = async (
  userId: string | Types.ObjectId | undefined,
  workspaceSlug: string,
) => {
  console.log(userId)
  const workspace = await WorkspaceModel.findOne({
    slug: workspaceSlug,
  });

  if (!workspace) {
    throw new NotFoundException("Workspace not found");
  }

  const member = await MemberModel.findOne({
    userId,
    workspaceId: workspace._id,
  }).populate("role");

  if (!member) {
    throw new UnauthorizedException(
      "You are not a member of this workspace",
      ErrorCodeEnum.ACCESS_UNAUTHORIZED,
    );
  }
  const roleName = member?.role.name;

  return { role: roleName };
};
