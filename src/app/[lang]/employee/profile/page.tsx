import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getSession } from "@/lib/auth";
import { User } from "lucide-react";

export default async function ProfilePage() {
  const session = await getSession();

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <User className="h-8 w-8 text-muted-foreground" />
        <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Your account details within the enterprise.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Full Name</span>
              <p className="text-lg font-medium">{session?.name || "Unknown"}</p>
            </div>
            <div className="space-y-1">
              <span className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Email Address</span>
              <p className="text-lg font-medium">{session?.userId || "unknown@domain.com"}</p>
            </div>
            <div className="space-y-1">
              <span className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Role</span>
              <p className="text-lg font-medium">{session?.role || "Employee"}</p>
            </div>
            <div className="space-y-1">
              <span className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Enterprise</span>
              <p className="text-lg font-medium">{session?.enterpriseName || "Unknown"}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
