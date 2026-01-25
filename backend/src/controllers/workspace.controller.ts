import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { HTTPSTATUS } from "../config/http.config";
import {
  createNewWorkspaceService,
  editWorkspaceService,
  getAllWorkspacesService,
  getWorkspaceByIdService,
} from "../services/workspace.service";
import {
  createWorkspaceSchema,
  editWorkspaceSchema,
  workspaceIdSchema,
} from "../validation/workspace.validation";
import { getMemberRoleInWorkspaceService } from "../services/member.service";
import { Permissions } from "../enums/role.enum";
import { roleGuard } from "../utils/roleGuard";

export const getAllWorkspacesController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req?.user;
    const { workspaces } = await getAllWorkspacesService(userId);
    

    return res.status(HTTPSTATUS.OK).json({
      message: "Workspaces fetched successfully",
      workspaces,
    });
  },
);

export const createNewWorkspaceController = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const body = createWorkspaceSchema.parse(req.body);
    const userId = req?.user;

    const { newWorkspace } = await createNewWorkspaceService(body, userId);

    return res.status(HTTPSTATUS.OK).json({
      message: "Workspace created successfully",
      workspace: newWorkspace,
    });
  },
);

export const editWorkspaceController = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const workspaceSlug = workspaceIdSchema.parse(req.params.workspaceSlug);
    const userId = req?.user;
    const body = editWorkspaceSchema.parse(req.body);

    const { role } = await getMemberRoleInWorkspaceService(
      userId,
      workspaceSlug,
    );
    roleGuard(role, [Permissions.VIEW_ONLY]);

    const { workspace } = await editWorkspaceService(
      body,
      userId,
      workspaceSlug,
    );

    return res.status(HTTPSTATUS.OK).json({
      message: "Workspace edited successfully",
      workspace,
    });
  },
);

export const deleteWorkspaceController = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    return res.status(HTTPSTATUS.OK).json({
      message: "Deleted workspace successfully",
    });
  },
);

export const getWorkspaceByIdController = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const userId = req?.user;
    const workspaceSlug = workspaceIdSchema.parse(req.params.workspaceId);

  
    await getMemberRoleInWorkspaceService(userId, workspaceSlug);

    const { workspace } = await getWorkspaceByIdService(userId, workspaceSlug);

    return res.status(HTTPSTATUS.OK).json({
      message: "Workspace fetched successfullly",
      workspace,
    });
  },
);
