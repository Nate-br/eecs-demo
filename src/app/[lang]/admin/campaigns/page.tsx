import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LaunchCampaignForm } from "./LaunchCampaignForm";
import { ShieldAlert } from "lucide-react";

export default function PhishingCampaignsPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <ShieldAlert className="h-8 w-8 text-destructive" />
        <h1 className="text-3xl font-bold tracking-tight">Phishing Campaigns</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Launch New Campaign</CardTitle>
          <CardDescription>Configure and dispatch a simulated phishing test to your organization.</CardDescription>
        </CardHeader>
        <CardContent>
          <LaunchCampaignForm />
        </CardContent>
      </Card>
      
      <div className="mt-8">
        <p className="text-sm text-muted-foreground">
          Note: Since this is an MVP environment without SMTP credentials, launching a campaign will not actually send emails. 
          Instead, it will print the generated tracking links to the server console so you can manually test the tracking webhooks.
        </p>
      </div>
    </div>
  );
}
