"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createUserAction } from "@/actions/users";
import { toast } from "sonner";

export function CreateUserForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const result = await createUserAction(formData);
    
    setIsSubmitting(false);
    
    if (result.error) {
      toast.error("Failed to create user", { description: result.error });
    } else {
      toast.success("User created successfully!");
      (e.target as HTMLFormElement).reset();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" name="name" placeholder="John Doe" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input id="email" name="email" type="email" placeholder="john@eecs.com" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="role">Role</Label>
        <select 
          id="role" 
          name="role" 
          className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <option value="Employee">Employee</option>
          <option value="Admin">Admin</option>
        </select>
      </div>
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Creating..." : "Create User"}
      </Button>
    </form>
  );
}
