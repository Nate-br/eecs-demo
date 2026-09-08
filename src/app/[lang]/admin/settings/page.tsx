"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { createModuleAction } from "@/actions/admin";
import { toast } from "sonner";
import { Settings, Plus } from "lucide-react";
import { MobileNav } from "@/components/mobile-nav";
import { ThemeToggle } from "@/components/theme-toggle";

export default function AdminSettingsPage({ params }: { params: { lang: string } }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const result = await createModuleAction(formData);
    
    setIsSubmitting(false);
    
    if (result.error) {
      toast.error("Failed to create module", { description: result.error });
    } else {
      toast.success("Module created successfully!");
      (e.target as HTMLFormElement).reset();
    }
  };

  return (
    <div className="flex flex-col h-full bg-background text-foreground min-h-screen">
      <header className="border-b border-border bg-background px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <MobileNav lang={params.lang} />
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Settings className="h-5 w-5 text-muted-foreground hidden md:block" />
            Platform Settings & CMS
          </h2>
        </div>
        <ThemeToggle />
      </header>
      
      <main className="p-6 max-w-2xl">
        <Card className="shadow-none border-border">
          <CardHeader>
            <CardTitle>Content Management System</CardTitle>
            <CardDescription>Create a new training module to assign to employees.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="titleEn">Module Title (English)</Label>
                <Input id="titleEn" name="titleEn" placeholder="e.g., Advanced Phishing Tactics" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="titleAm">Module Title (Amharic)</Label>
                <Input id="titleAm" name="titleAm" placeholder="e.g., የላቀ የማስገር ስልቶች" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input id="description" name="description" placeholder="Brief summary of the module content" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="target">Target Department</Label>
                <Input id="target" name="target" placeholder="e.g., Employee, Developer, HR, All" required defaultValue="All" />
              </div>
              <Button type="submit" disabled={isSubmitting} className="mt-4">
                <Plus className="w-4 h-4 mr-2" />
                {isSubmitting ? "Creating..." : "Create Module"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
