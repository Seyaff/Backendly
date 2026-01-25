import { useEffect, useState } from "react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ChevronsUpDown, Plus, Settings } from "lucide-react";
import { useAuthContext } from "@/context/auth.provider";
import type { Workspace } from "@/types/api.types";
import { Link, useNavigate } from "react-router-dom";
import useCreateWorkspaceDialog from "@/hooks/use-create-workspace-dialgoue";

const TeamSwitcher = () => {
  const { isMobile } = useSidebar();
  const navigate = useNavigate();
  const { onOpen } = useCreateWorkspaceDialog();

  const { workspacesResponse, workspaceLoading } = useAuthContext();

  const workspaces = workspacesResponse?.workspaces ?? [];

  const [activeWorkspace, setActiveWorkspace] = useState<Workspace | null>(
    null,
  );

  // Set default workspace when data loads
  useEffect(() => {
    if (!activeWorkspace && workspaces.length > 0) {
      setActiveWorkspace(workspaces[0]);
    }
  }, [workspaces, activeWorkspace]);

  if (workspaceLoading || !activeWorkspace) return null;

  const onSelect = (workspace: Workspace) => {
    setActiveWorkspace(workspace);
    navigate(`/${workspace.slug}`);
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center font-semibold justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                {activeWorkspace?.name?.split(" ")?.[0]?.charAt(0)}
              </div>

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {activeWorkspace.name}
                </span>
                <span className="truncate text-xs">
                  {activeWorkspace.visibility}
                </span>
              </div>

              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Workspaces
            </DropdownMenuLabel>

            {workspaces.map((workspace) => (
              <DropdownMenuItem
                key={workspace._id}
                onClick={() => onSelect(workspace)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-md border">
                  <span>{workspace.icon}</span>
                </div>

                {workspace.name}
                <DropdownMenuShortcut>
                  <span className="">
                    {" "}
                    <Link
                    onClick={(e) => e.stopPropagation()}
                      to={`/${workspace.slug}/settings`}
                      className="w-6 h-6 flex items-center justify-center rounded-[5px] hover:bg-zinc-200 hover:scale-120 transition-all duration-300"
                    >
                      <Settings />{" "}
                    </Link>
                  </span>

                  {/* </div> */}
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="gap-2 p-2 cursor-pointer!"
              onClick={onOpen}
            >
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">
                Add workspace
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default TeamSwitcher;
