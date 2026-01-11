import { Link } from "react-router-dom";
import Logo from "../logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";
import { Separator } from "../ui/separator";
import { ChevronUp, Inbox, Loader, LogOut, User2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import { useAuthContext } from "@/context/auth.provider";
import useLogout from "@/hooks/api/useLogout";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Inbox,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: User2,
  },
];

const Asidebar = () => {
  const { isLoading, user } = useAuthContext();
  const { open } = useSidebar();
  const [, setIsOpen] = useState(false);

  const { mutate: logout } = useLogout();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex gap-2 h-12.5 items-center justify-start w-full px-1">
          <Logo />
          {open && <Link to={"/"}>Backendly</Link>}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <Separator />
          <SidebarGroupLabel>Nomralities</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="outline-none focus:outline-none border-none">
        <SidebarMenu>
          <SidebarMenuItem>
            {isLoading ? (
              <Loader
                size="24px"
                className="place-self-center self-center animate-spin"
              />
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <div className="flex items-center justify-center gap-2 ">
                      <User2 size={24} />{" "}
                      <div className="flex flex-col items-start">
                        <span className="font-semibold tracking-tight leading-none">
                          {user?.name}
                        </span>
                        <span className="text-[12px]">Free</span>
                      </div>
                    </div>
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                  side={"bottom"}
                  align="start"
                  sideOffset={4}
                >
                  <DropdownMenuItem>
                    <span>Account</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Billing</span>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={() => {
                      setIsOpen(true);
                      logout();
                    }}
                  >
                    <LogOut />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default Asidebar;
