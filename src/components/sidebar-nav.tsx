"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, ShieldAlert, Settings, BookOpen, User } from "lucide-react";

export function AdminSidebarNav({ lang }: { lang: string }) {
  const pathname = usePathname();
  
  const links = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/users", label: "User Management", icon: Users },
    { href: "/admin/campaigns", label: "Phishing Campaigns", icon: ShieldAlert },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ];

  return (
    <nav className="mt-6 px-4 space-y-1">
      {links.map((link) => {
        const isActive = pathname.includes(link.href);
        const Icon = link.icon;
        return (
          <Link 
            key={link.href}
            href={`/${lang}${link.href}`} 
            className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
              isActive 
                ? "bg-accent text-accent-foreground" 
                : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
            }`}
          >
            <Icon className="mr-3 h-4 w-4" />
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function EmployeeSidebarNav({ lang }: { lang: string }) {
  const pathname = usePathname();
  
  const links = [
    { href: "/employee/dashboard", label: "Learning Paths", icon: BookOpen },
    { href: "/employee/profile", label: "Profile", icon: User },
    { href: "/employee/settings", label: "Settings", icon: Settings },
  ];

  return (
    <nav className="mt-6 px-4 space-y-1">
      {links.map((link) => {
        const isActive = pathname.includes(link.href);
        const Icon = link.icon;
        return (
          <Link 
            key={link.href}
            href={`/${lang}${link.href}`} 
            className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
              isActive 
                ? "bg-accent text-accent-foreground" 
                : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
            }`}
          >
            <Icon className="mr-3 h-4 w-4" />
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
