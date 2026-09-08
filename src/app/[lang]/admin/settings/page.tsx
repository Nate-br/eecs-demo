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
import { supabase, hasValidSupabaseEnv } from "@/lib/supabase";

export default function AdminSettingsPage({ params }: { params: { lang: string } }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setUploadProgress("");
    
    const formData = new FormData(e.currentTarget);
    
    let videoUrl = "";
    if (file) {
      if (!hasValidSupabaseEnv()) {
        toast.error("Supabase environment variables are missing. Cannot upload video.");
        setIsSubmitting(false);
        return;
      }
      
      setUploadProgress("Uploading video...");
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from('courses')
        .upload(`videos/${fileName}`, file);
        
      if (error) {
        toast.error("Video upload failed", { description: error.message });
        setIsSubmitting(false);
        return;
      }
      
      const { data: publicUrlData } = supabase.storage
        .from('courses')
        .getPublicUrl(`videos/${fileName}`);
        
      videoUrl = publicUrlData.publicUrl;
      formData.append("videoUrl", videoUrl);
    }

    setUploadProgress("Saving module...");
    const result = await createModuleAction(formData);
    
    setIsSubmitting(false);
    setUploadProgress("");
    
    if (result.error) {
      toast.error("Failed to create module", { description: result.error });
    } else {
      toast.success("Module created successfully!");
      (e.target as HTMLFormElement).reset();
      setFile(null);
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
              <div className="space-y-2">
                <Label htmlFor="video">Course Video (Optional)</Label>
                <Input 
                  id="video" 
                  type="file" 
                  accept="video/mp4,video/x-m4v,video/*" 
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
                <p className="text-xs text-muted-foreground">Upload an MP4 video. This requires Supabase Storage to be configured.</p>
              </div>
              <Button type="submit" disabled={isSubmitting} className="mt-4">
                <Plus className="w-4 h-4 mr-2" />
                {isSubmitting ? (uploadProgress || "Creating...") : "Create Module"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
