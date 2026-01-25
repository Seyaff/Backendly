import { Router } from "express";
import { createNewWorkspaceController, deleteWorkspaceController, editWorkspaceController, getAllWorkspacesController, getWorkspaceByIdController } from "../controllers/workspace.controller";

const workspaceRoutes = Router()

workspaceRoutes.get("/all" , getAllWorkspacesController)
workspaceRoutes.post("/create" , createNewWorkspaceController)
workspaceRoutes.put("/edit/:workspaceSlug" , editWorkspaceController)
workspaceRoutes.delete("/delete/:workspaceSlug" , deleteWorkspaceController)
workspaceRoutes.get("/:workspaceId" , getWorkspaceByIdController)


export default workspaceRoutes