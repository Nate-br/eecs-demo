"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucideIcon } from "lucide-react";

export function SidebarNav({ 
  links, 
  lang 
}: { 
  links: { href: string; label: string; icon: LucideIcon }[];
  lang: string;
}) {
  const pathname = usePathname();

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
