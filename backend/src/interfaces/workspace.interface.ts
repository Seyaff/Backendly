export interface createWorkspaceDto {
  name: string;
  description?: string;
  icon?: string;
  visibility?: "PRIVATE" | "PUBLIC";
}

export interface EditWorkspaceDTO {
  name: string;
  description?: string;
  icon?: string;
}
