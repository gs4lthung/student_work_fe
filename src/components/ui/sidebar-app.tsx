import {
  FileUser,
  Home,
  LayoutDashboard,
  Newspaper,
  Save,
  Settings,
  User,
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
import { UserInterface } from "@/interfaces/user-interface";

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
    roles: ["Student", "Employer"] as UserInterface["role"][],
  },
  {
    title: "Hồ sơ",
    url: "/dashboard/profile",
    icon: User,
    roles: ["Student", "Employer"] as UserInterface["role"][],
  },
  {
    title: "CV của tôi",
    url: "/dashboard/my-cv",
    icon: FileUser,
    roles: ["Student"] as UserInterface["role"][],
  },
  {
    title: "Việc làm đã lưu",
    url: "/dashboard/saved-jobs",
    icon: Save,
    roles: ["Student"] as UserInterface["role"][],
  },
  {
    title: "Việc làm đã ứng tuyển",
    url: "/dashboard/applied-jobs",
    icon: Save,
    roles: ["Student"] as UserInterface["role"][],
  },
  {
    title: "Tin đăng",
    url: "/dashboard/post",
    icon: Newspaper,
    roles: ["Employer"] as UserInterface["role"][],
  },
  {
    title: "Dịch vụ",
    url: "/dashboard/service",
    icon: Save,
    roles: ["Employer"] as UserInterface["role"][],
  },
  {
    title: "Setting",
    url: "#",
    icon: Settings,
    roles: ["Student", "Employer"] as UserInterface["role"][],
  },
];

export async function AppSidebar({ role }: { role: UserInterface["role"] }) {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>SWork</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map(
                (item) =>
                  (!item.roles || item.roles.includes(role)) && (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton>
                        <a href={item.url} className="flex items-center gap-2">
                          {item.icon && <item.icon className="h-4 w-4" />}
                          {item.title}
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
