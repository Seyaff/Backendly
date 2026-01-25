import { z } from "zod";

export const createWorkspaceSchema = z.object({
  name: z
    .string()
    .min(3, "Workspace name must be at least 3 characters")
    .max(50, "Workspace name must be at most 50 characters")
    .trim(),

  description: z
    .string()
    .max(255, "Description must be at most 255 characters")
    .trim()
    .optional(),

  icon: z
    .string()
    .min(1, "Icon is required")
    .max(4, "Icon must be a single emoji")
    .optional()
    .default("📁"),

  visibility: z.enum(["PRIVATE", "PUBLIC"]).optional().default("PRIVATE"),
});

export const nameSchema = z
  .string()
  .trim()
  .min(1, { message: "Name is required" })
  .max(255);

export const descriptionSchema = z.string().trim().optional();
export const iconSchema = z.string().trim().optional()

export const workspaceIdSchema = z
  .string()
  .trim()
  .min(1, { message: "Workspace slug is required" });

export const editWorkspaceSchema = z.object({
  name: nameSchema,
  description: descriptionSchema,
  icon : iconSchema
  
});
