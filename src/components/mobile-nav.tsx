"use client";

import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, LayoutDashboard, Users, ShieldAlert, Settings, BookOpen, User } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/components/auth-provider";
import { SidebarLogoutButton, SidebarToastButton } from "@/components/sidebar-actions";

export function MobileNav({ lang }: { lang: string }) {
  const { role } = useAuth();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0 bg-sidebar border-r-border">
        <SheetTitle className="sr-only">Mobile Navigation</SheetTitle>
        <div className="p-6">
          <h1 className="text-xl font-bold font-sans tracking-tight">EECS</h1>
          <p className="text-xs text-muted-foreground mt-1">Enterprise Analytics</p>
        </div>
        <nav className="mt-2 px-4 space-y-1">
          {role === "Admin" ? (
            <>
              <Link href={`/${lang}/admin/dashboard`} className="flex items-center px-4 py-2 text-sm font-medium rounded-md bg-accent text-accent-foreground">
                <LayoutDashboard className="mr-3 h-4 w-4" />
                Dashboard
              </Link>
              <Link href={`/${lang}/admin/users`} className="flex items-center px-4 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-accent/50 hover:text-foreground">
                <Users className="mr-3 h-4 w-4" />
                User Management
              </Link>
              <Link href={`/${lang}/admin/campaigns`} className="flex items-center px-4 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-accent/50 hover:text-foreground">
                <ShieldAlert className="mr-3 h-4 w-4" />
                Phishing Campaigns
              </Link>
              <Link href={`/${lang}/admin/settings`} className="flex items-center px-4 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-accent/50 hover:text-foreground">
                <Settings className="mr-3 h-4 w-4" />
                Settings
              </Link>
            </>
          ) : (
            <>
              <Link href={`/${lang}/employee/dashboard`} className="flex items-center px-4 py-2 text-sm font-medium rounded-md bg-accent text-accent-foreground">
                <BookOpen className="mr-3 h-4 w-4" />
                Learning Paths
              </Link>
              <Link href={`/${lang}/employee/profile`} className="flex items-center px-4 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-accent/50 hover:text-foreground">
                <User className="mr-3 h-4 w-4" />
                Profile
              </Link>
              <Link href={`/${lang}/employee/settings`} className="flex items-center px-4 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-accent/50 hover:text-foreground">
                <Settings className="mr-3 h-4 w-4" />
                Settings
              </Link>
            </>
          )}
        </nav>
        <div className="absolute bottom-0 w-full p-4 border-t border-border">
          <SidebarLogoutButton lang={lang} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
