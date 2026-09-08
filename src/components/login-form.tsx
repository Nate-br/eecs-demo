"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm({ lang, dictionary }: { lang: string, dictionary: any }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const result = await loginAction(email);
    
    if (result.error) {
      setError(result.error);
      setIsLoading(false);
      return;
    }
    
    if (result.role === "Admin") {
      router.push(`/${lang}/admin/dashboard`);
    } else {
      router.push(`/${lang}/employee/dashboard`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-muted-foreground text-xs uppercase tracking-wider font-semibold">Email Address</Label>
        <Input 
          id="email" 
          type="email" 
          placeholder="admin@eecs.com or user@eecs.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
          className="bg-transparent border-border"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password" className="text-muted-foreground text-xs uppercase tracking-wider font-semibold">Password</Label>
        <Input 
          id="password" 
          type="password" 
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="bg-transparent border-border"
        />
      </div>
      
      {error && (
        <div className="text-destructive text-sm font-medium">{error}</div>
      )}

      <Button 
        type="submit" 
        className="w-full mt-6 bg-primary text-primary-foreground hover:bg-primary/90" 
        disabled={isLoading}
      >
        {isLoading ? "Signing in..." : "Sign In"}
      </Button>
      <div className="text-center mt-4 text-xs text-muted-foreground">
        <p>Tip: Use "admin" in your email to access the Admin portal.</p>
      </div>
    </form>
  );
}
