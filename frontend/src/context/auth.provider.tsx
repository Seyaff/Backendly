import useGetWorkspaceQuery from "@/hooks/api/use-get-workspace";
import useAuth from "@/hooks/api/useAuth";
import useWorkspaceSlug from "@/hooks/use-workspace-slug";
import useWorkspace from "@/hooks/useWorkspace";
import type {
  UserType,
  Workspace,
  WorkspaceResponseType,
} from "@/types/api.types";
import React, { createContext, useContext } from "react";

type AuthContextType = {
  user?: UserType;
  error: any;
  isLoading: boolean;
  isFetching: boolean;
  // workspaces : Workspace[]
  workspacesResponse: WorkspaceResponseType;
  workspaceLoading: boolean;

  refetchAuth: () => void;

  WorkspaceData: {
    message : string,
    workspace : Workspace
  };
  SingleWorkspaceLoading: boolean;
  SingleWorkspaceError: any;
  SingleWorkspaceRefetch: () => void;
};
interface Props {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: Props) => {
  const workspaceSlug = useWorkspaceSlug();

  const {
    data: authData,
    error: authError,
    isLoading,
    isFetching,
    refetch: refetchAuth,
  } = useAuth();
  const user = authData?.user;

  const {
    data: WorkspaceData,
    isLoading: SingleWorkspaceLoading,
    error: SingleWorkspaceError,
    refetch: SingleWorkspaceRefetch,
  } = useGetWorkspaceQuery(workspaceSlug);

  const { data: workspacesResponse, isLoading: workspaceLoading } =
    useWorkspace();

  return (
    <AuthContext.Provider
      value={{
        user,
        error: authError,
        isLoading,
        isFetching,
        refetchAuth,
        workspacesResponse,
        workspaceLoading,
        WorkspaceData,
        SingleWorkspaceLoading,
        SingleWorkspaceError,
        SingleWorkspaceRefetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useCurrentUserContext must be used within a AuthProvider");
  }
  return context;
};
