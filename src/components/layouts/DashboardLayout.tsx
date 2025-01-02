import { Footer } from "@/components/Footer";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Users, UserCog, Settings, LayoutGrid, Grid2X2, Grid3X3 } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const menuItems = [
  {
    title: "Members Profile",
    path: "/members",
    icon: Users,
  },
  {
    title: "Collectors",
    path: "/collectors",
    icon: UserCog,
  },
  {
    title: "System Tools",
    path: "/system-tools",
    icon: Settings,
  },
];

const gridButtons = [
  {
    title: "Default View",
    icon: LayoutGrid,
  },
  {
    title: "Compact View",
    icon: Grid2X2,
  },
  {
    title: "Detailed View",
    icon: Grid3X3,
  },
];

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarContent>
            <div className="flex items-center justify-between px-4 py-2">
              <span className="text-lg font-semibold">Dashboard</span>
              <SidebarTrigger />
            </div>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        onClick={() => navigate(item.path)}
                        isActive={location.pathname === item.path}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="bg-background border-b p-4">
            <div className="flex items-center space-x-2">
              {gridButtons.map((button) => (
                <Button
                  key={button.title}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <button.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{button.title}</span>
                </Button>
              ))}
            </div>
          </div>
          <main className="flex-1 overflow-y-auto bg-background">
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </SidebarProvider>
  );
};