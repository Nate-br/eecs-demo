import { ReactNode } from "react";
import Link from "next/link";
import { BookOpen, User, LogOut, Settings } from "lucide-react";
import { SidebarToastButton, SidebarLogoutButton } from "@/components/sidebar-actions";

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
        <nav className="mt-6 px-4 space-y-1">
          <Link href={`/${params.lang}/employee/dashboard`} className="flex items-center px-4 py-2 text-sm font-medium rounded-md bg-accent text-accent-foreground">
            <BookOpen className="mr-3 h-4 w-4" />
            Learning Paths
          </Link>
          <Link href={`/${params.lang}/employee/profile`} className="flex items-center px-4 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-accent/50 hover:text-foreground">
            <User className="mr-3 h-4 w-4" />
            Profile
          </Link>
          <Link href={`/${params.lang}/employee/settings`} className="flex items-center px-4 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-accent/50 hover:text-foreground">
            <Settings className="mr-3 h-4 w-4" />
            Settings
          </Link>
        </nav>
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
