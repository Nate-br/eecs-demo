"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ShieldAlert, Send } from "lucide-react";

export function PhishingModal({ dictionary }: { dictionary: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [target, setTarget] = useState("all");
  const [template, setTemplate] = useState("urgent-password");
  const [isSending, setIsSending] = useState(false);

  const handleLaunch = async () => {
    setIsSending(true);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSending(false);
    setIsOpen(false);
    toast.success(dictionary.phishing.success, {
      description: `Campaign sent to ${target === 'all' ? 'All Departments' : target} using the '${template}' template.`,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          {dictionary.phishing.button}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-background border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-muted-foreground" />
            Configure Campaign
          </DialogTitle>
          <DialogDescription>
            Select the target audience and template for this simulated phishing attack.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Target Department</label>
            <select 
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <option value="all">All Departments</option>
              <option value="hr">Human Resources</option>
              <option value="dev">Engineering</option>
              <option value="sales">Sales</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Email Template</label>
            <select 
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <option value="urgent-password">Urgent: Password Reset Required</option>
              <option value="hr-policy">HR: New Policy Update</option>
              <option value="payroll">Payroll: Tax Document Attached</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <Button variant="outline" onClick={() => setIsOpen(false)} className="border-border">
            Cancel
          </Button>
          <Button onClick={handleLaunch} disabled={isSending}>
            {isSending ? "Launching..." : (
              <>
                <Send className="w-4 h-4 mr-2" /> Launch Campaign
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
