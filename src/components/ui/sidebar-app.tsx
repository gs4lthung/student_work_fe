import {
  Box,
  FileUser,
  Home,
  LayoutDashboard,
  Newspaper,
  Settings,
  User,
  Users,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Trang chủ",
    url: "/",
    icon: Home,
  },
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Hồ sơ",
    url: "/dashboard/profile",
    icon: User,
  },
  {
    title: "CV của tôi",
    url: "/dashboard/my-cv",
    icon: FileUser,
  },
  {
    title: "Tin đăng",
    url: "/dashboard/post",
    icon: Newspaper,
  },
  {
    title: "Ứng viên",
    url: "#",
    icon: Users,
  },
  {
    title: "Dịch vụ",
    url: "/dashboard/service",
    icon: Box,
  },
  {
    title: "Setting",
    url: "#",
    icon: Settings,
  },
];

export async function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>SWork</SidebarGroupLabel>
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
    </Sidebar>
  );
}
