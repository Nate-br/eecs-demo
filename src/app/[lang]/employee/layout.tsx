import { ReactNode } from "react";
import Link from "next/link";
import { BookOpen, User, LogOut, Settings } from "lucide-react";
import { SidebarToastButton, SidebarLogoutButton } from "@/components/sidebar-actions";
import { SidebarNav } from "@/components/sidebar-nav";

export default async function EmployeeLayout({
  children,
  params: propsParams,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const params = await propsParams;
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar border-r border-border hidden md:block">
        <div className="p-6">
          <h1 className="text-xl font-bold font-sans tracking-tight">EECS</h1>
          <p className="text-xs text-muted-foreground mt-1">Employee Portal</p>
        </div>
        <SidebarNav 
          lang={params.lang} 
          links={[
            { href: "/employee/dashboard", label: "Learning Paths", icon: BookOpen },
            { href: "/employee/profile", label: "Profile", icon: User },
            { href: "/employee/settings", label: "Settings", icon: Settings },
          ]}
        />
        <div className="absolute bottom-0 w-64 p-4 border-t border-border">
          <SidebarLogoutButton lang={params.lang} />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {children}
      </main>
    </div>
  );
}
