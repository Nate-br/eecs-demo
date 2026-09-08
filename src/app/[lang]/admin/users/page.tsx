import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, UserPlus, Shield } from "lucide-react";
import { db } from "@/lib/db";
import { CreateUserForm } from "./CreateUserForm";

export default async function AdminUsersPage() {
  const users = await db.user.findMany();

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <Users className="h-8 w-8 text-muted-foreground" />
        <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Add User Form */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <UserPlus className="mr-2 h-4 w-4" />
                Add Employee
              </CardTitle>
              <CardDescription>Provision a new user account.</CardDescription>
            </CardHeader>
            <CardContent>
              <CreateUserForm />
            </CardContent>
          </Card>
        </div>

        {/* User List */}
        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Directory</CardTitle>
              <CardDescription>All users across your enterprise.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border border-border">
                <table className="w-full text-sm text-left">
                  <thead className="bg-muted/50 text-muted-foreground border-b border-border">
                    <tr>
                      <th className="px-4 py-3 font-medium">Name</th>
                      <th className="px-4 py-3 font-medium">Email</th>
                      <th className="px-4 py-3 font-medium">Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u: any) => (
                      <tr key={u.id} className="border-b border-border last:border-0 hover:bg-muted/20">
                        <td className="px-4 py-3 font-medium">{u.name}</td>
                        <td className="px-4 py-3 text-muted-foreground">{u.email}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${u.role === 'Admin' ? 'bg-blue-500/10 text-blue-500' : 'bg-slate-500/10 text-slate-500'}`}>
                            {u.role === 'Admin' && <Shield className="mr-1 h-3 w-3" />}
                            {u.role}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
