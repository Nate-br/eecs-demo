"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { launchCampaignAction } from "@/actions/phishing";
import { Send } from "lucide-react";
import { toast } from "sonner";

export function LaunchCampaignForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    try {
      const result = await launchCampaignAction(formData);
      
      if (result && result.error) {
        toast.error("Failed to launch campaign", { description: result.error });
      } else {
        toast.success("Campaign Launched Successfully!", {
          description: "Emails have been dispatched to the target users."
        });
        (e.target as HTMLFormElement).reset();
      }
    } catch (error: any) {
      toast.error("An error occurred", { description: error.message || "Could not launch campaign" });
    }
    
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Campaign Name</Label>
        <Input id="name" name="name" placeholder="e.g. Q3 Urgent Password Reset" required />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="targetDepartment">Target Department</Label>
        <select 
          id="targetDepartment" 
          name="targetDepartment" 
          className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          required
        >
          <option value="All">All Employees</option>
          <option value="Finance">Finance</option>
          <option value="HR">Human Resources</option>
          <option value="Engineering">Engineering</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="template">Email Template</Label>
        <select 
          id="template" 
          name="template" 
          className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          required
        >
          <option value="Microsoft 365 Password Expiry">Microsoft 365 Password Expiry</option>
          <option value="Google Workspace Suspicious Login">Google Workspace Suspicious Login</option>
          <option value="HR Payroll Update Required">HR Payroll Update Required</option>
        </select>
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
        <Send className="mr-2 h-4 w-4" />
        {isSubmitting ? "Dispatching Emails..." : "Launch Campaign"}
      </Button>
    </form>
  );
}
