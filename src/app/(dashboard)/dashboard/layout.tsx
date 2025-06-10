import { AppSidebar } from "@/components/ui/sidebar-app";
import DynamicBreadcrumb from "@/components/ui/breadcrumb-dynamic";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { cookies } from "next/headers";
export default async function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const roleCookie = cookieStore.get("userRole");
  const userRole = roleCookie ? roleCookie.value : "Student";
  return (
    <SidebarProvider>
      <AppSidebar role={userRole as "Student" | "Employer"} />
      <main className="w-full p-5 bg-white dark:bg-zinc-950">
        <SidebarTrigger />
        <DynamicBreadcrumb />
        {children}
      </main>
    </SidebarProvider>
  );
}
