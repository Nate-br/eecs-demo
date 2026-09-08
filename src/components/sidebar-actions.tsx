"use client";

import { useAuth } from "@/components/auth-provider";
import { toast } from "sonner";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { logoutAction } from "@/actions/auth";
import { useState } from "react";

export function SidebarToastButton({ children, label }: { children: React.ReactNode, label: string }) {
  return (
    <button
      onClick={() => toast.info(`${label} is coming soon in the next MVP phase.`)}
      className="w-full flex items-center px-4 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-accent/50 hover:text-foreground text-left"
    >
      {children}
      {label}
    </button>
  );
}

export function SidebarLogoutButton({ lang }: { lang: string }) {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logoutAction();
    router.push(`/${lang}`);
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoggingOut}
      className="w-full flex items-center px-4 py-2 text-sm font-medium rounded-md text-destructive hover:bg-destructive/10 text-left disabled:opacity-50"
    >
      <LogOut className="mr-3 h-4 w-4" />
      {isLoggingOut ? "Logging Out..." : "Log Out"}
    </button>
  );
}
