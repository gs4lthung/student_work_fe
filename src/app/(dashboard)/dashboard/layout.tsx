import { AppSidebar } from "@/components/ui/sidebar-app";
import DynamicBreadcrumb from "@/components/ui/breadcrumb-dynamic";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
export default function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full p-5 bg-white dark:bg-zinc-950">
        <SidebarTrigger />
        <DynamicBreadcrumb />
        {children}
      </main>
    </SidebarProvider>
  );
}
