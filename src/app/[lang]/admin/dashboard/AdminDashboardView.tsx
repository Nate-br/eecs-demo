"use client";

import { useAuth } from "@/components/auth-provider";
import { LanguageToggle } from "@/components/language-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { ShieldAlert, Activity, CheckCircle, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { PhishingModal } from "@/components/phishing-modal";
import { MobileNav } from "@/components/mobile-nav";

const mockComplianceData = [
  { name: 'Developers', score: 85 },
  { name: 'HR', score: 92 },
  { name: 'Sales', score: 78 },
  { name: 'Management', score: 95 },
];

const mockCompletionData = [
  { name: 'Completed', value: 400 },
  { name: 'In Progress', value: 300 },
  { name: 'Not Started', value: 300 },
];

const COLORS = ['#18181b', '#52525b', '#a1a1aa'];

export function AdminDashboardView({ dictionary, lang, allModules, phishingEvents = [], users = [] }: { dictionary: any, lang: string, allModules: any[], phishingEvents?: any[], users?: any[] }) {
  const { user, role } = useAuth();
  
  if (!user) return null;

  const complianceData = mockComplianceData;
  const completionData = mockCompletionData;

  // Calculate stats
  const totalEmployees = users.length;
  const totalOpened = phishingEvents.filter(e => e.type === "OPENED").length;
  const totalClicked = phishingEvents.filter(e => e.type === "CLICKED").length;
  const totalSubmitted = phishingEvents.filter(e => e.type === "SUBMITTED").length;
  
  const actualPhishingData = [
    { name: "Opened", count: totalOpened },
    { name: "Clicked Link", count: totalClicked },
    { name: "Submitted Credentials", count: totalSubmitted },
  ];

  return (
    <div className="flex flex-col h-full bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-background px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <MobileNav lang={lang} />
          <div>
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Activity className="h-5 w-5 text-muted-foreground hidden md:block" />
              {dictionary.navigation.admin_panel}
            </h2>
            <p className="text-sm text-muted-foreground mt-1 hidden md:block">{user.enterpriseName} - {role} Admin Overview</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <LanguageToggle currentLang={lang} />
        </div>
      </header>

      {/* Content */}
      <div className="p-6 overflow-y-auto flex-1">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Compliance Score Chart */}
          <div className="lg:col-span-2">
            <Card className="h-full shadow-none border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base font-medium">
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                  {dictionary.dashboard.compliance}
                </CardTitle>
                <CardDescription>Department average compliance scores</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={complianceData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272a" />
                    <XAxis dataKey="name" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                      cursor={{fill: 'rgba(255,255,255,0.05)'}} 
                      contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '6px' }}
                    />
                    <Bar dataKey="score" fill="#fafafa" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Completion Rate Chart */}
          <div>
            <Card className="h-full shadow-none border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base font-medium">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  {dictionary.dashboard.completion_rate}
                </CardTitle>
                <CardDescription>Overall course status</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex flex-col items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={completionData}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                      stroke="none"
                    >
                      {completionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '6px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Phishing Simulator Action */}
          <div className="lg:col-span-3">
            <Card className="shadow-none border-border">
              <CardHeader>
                <CardTitle className="flex items-center text-base font-medium">
                  <ShieldAlert className="mr-2 h-4 w-4 text-muted-foreground" />
                  Live Phishing Campaign Results
                </CardTitle>
                <CardDescription>
                  Tracking employee interactions with simulated phishing emails
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                {phishingEvents.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={actualPhishingData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272a" />
                      <XAxis dataKey="name" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                      <Tooltip 
                        cursor={{fill: 'rgba(255,255,255,0.05)'}} 
                        contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '6px' }}
                      />
                      <Bar dataKey="count" fill="#ef4444" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                    <p className="mb-4">No active campaigns.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

        </motion.div>
      </div>
    </div>
  );
}
