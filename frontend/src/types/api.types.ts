export type registerType = {
  name: string;
  email: string;
  password: string;
};

export type loginType = {
  email: string;
  password: string;
};

export type UserType = {
  _id?: string;
  name?: string;
  email?: string;
  profilePicture?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type verifyEmailType = { code: string };
export type WorkspaceVisibility = "PRIVATE" | "PUBLIC";
// api.types.ts
export type Workspace = {
  _id: string;
  name: string;
  owner: string;
  description: string;
  currentWorkspaceSlug: string;
  icon: string;
  slug: string;
  joinCode: string;
  visibility: "PRIVATE" | "PUBLIC";
};

export type WorkspaceResponseType = {
  message: string;
  workspaces: Workspace[];
};

export type CreateWorkspaceType = {
  name: string;
  description: string;
};


export type CreateWorkspaceResponseType = {
  message: string;
  workspace: Workspace;
};