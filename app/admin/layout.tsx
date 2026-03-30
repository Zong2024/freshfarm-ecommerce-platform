import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { DashboardTopbar } from "@/components/layout/DashboardTopbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-muted/30 flex min-h-screen">
      <DashboardSidebar role="admin" className="hidden md:flex" />
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardTopbar role="admin" />
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <div className="mx-auto max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
