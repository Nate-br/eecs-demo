"use client";

import { useAuth } from "@/components/auth-provider";
import { LanguageToggle } from "@/components/language-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { PlayCircle, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";
import { MobileNav } from "@/components/mobile-nav";

export function EmployeeDashboardView({ dictionary, lang, allModules, completedModules }: { dictionary: any, lang: string, allModules: any[], completedModules: number[] }) {
  const { user, role } = useAuth();

  const displayModules = allModules
    .filter(m => m.target === role || m.target === "All" || m.target === "Employee")
    .map(m => ({
      ...m,
      status: completedModules.includes(m.id) ? "Completed" : m.status
    }));

  return (
    <div className="flex flex-col h-full bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-background px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <MobileNav lang={lang} />
          <div>
            <h2 className="text-xl font-semibold">
              <span className="hidden md:inline">{dictionary.dashboard.welcome}, </span>
              <span className="text-foreground md:text-muted-foreground">{user.name}</span>
            </h2>
            <p className="text-sm text-muted-foreground mt-1 hidden md:block">{user.enterprise_name} - {role}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <LanguageToggle currentLang={lang} />
        </div>
      </header>

      {/* Content */}
      <div className="p-6 overflow-y-auto flex-1">
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
            <PlayCircle className="w-4 h-4 text-muted-foreground" />
            {dictionary.navigation.courses}
          </h3>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {displayModules.map(module => (
              <Card key={module.id} className="shadow-none border-border">
                <CardHeader>
                  <CardTitle className="text-base font-medium">
                    {lang === "am" ? module.title_am : module.title_en}
                  </CardTitle>
                  <CardDescription>{module.target} Module</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mt-2 pt-4 border-t border-border">
                    <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                      {module.status === 'Completed' && <CheckCircle className="w-3.5 h-3.5" />}
                      {module.status === 'In Progress' && <Clock className="w-3.5 h-3.5" />}
                      {module.status === 'Completed' ? dictionary.courses.completed :
                       module.status === 'In Progress' ? dictionary.courses.in_progress :
                       dictionary.courses.start}
                    </span>
                    <div className="flex items-center gap-2">
                      {module.status === 'Completed' && (
                        <Button 
                          asChild
                          variant="outline"
                          size="sm"
                        >
                          <Link href={`/${lang}/employee/certificates/${module.id}`}>
                            Certificate
                          </Link>
                        </Button>
                      )}
                      <Button 
                        asChild
                        variant={module.status === 'Completed' ? "secondary" : "default"}
                        size="sm"
                      >
                        <Link href={`/${lang}/employee/course/${module.id}`}>
                          {module.status === 'Completed' ? "Review" : dictionary.courses.start}
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
