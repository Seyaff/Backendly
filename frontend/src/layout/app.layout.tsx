import Asidebar from "@/components/asidebar/asidebar";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AuthProvider } from "@/context/auth.provider";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <AuthProvider>
      <SidebarProvider>
        <Asidebar />

        <SidebarInset className="flex flex-col min-h-screen">
          <header className="h-14 flex items-center px-4 border-b">
            <SidebarTrigger />
          </header>

          <main className="flex-1 p-4">
            <Outlet />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </AuthProvider>
  );
}
