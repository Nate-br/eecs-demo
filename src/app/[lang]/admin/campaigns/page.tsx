import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { launchCampaignAction } from "@/actions/phishing";
import { ShieldAlert, Send } from "lucide-react";

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
          <form action={launchCampaignAction as any} className="space-y-6">
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

            <Button type="submit" className="w-full sm:w-auto">
              <Send className="mr-2 h-4 w-4" />
              Launch Campaign
            </Button>
          </form>
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
