import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function PhishingLoginPage(props: {
  searchParams: Promise<{ c?: string; u?: string }>;
  params: Promise<{ lang: string }>;
}) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  
  const campaignId = searchParams.c;
  const userId = searchParams.u;

  // Track the CLICKED event immediately upon rendering the page
  if (campaignId && userId) {
    await db.phishingEvent.create({
      data: {
        campaignId,
        userId,
        type: "CLICKED",
        userAgent: "Server-side logged",
        ip: "Server-side logged",
      }
    });
  }

  async function submitCredentials(formData: FormData) {
    "use server";
    
    // We intentionally DO NOT save the password. We only log that they submitted data.
    if (campaignId && userId) {
      await db.phishingEvent.create({
        data: {
          campaignId,
          userId,
          type: "SUBMITTED",
          userAgent: "Form Submission",
          ip: "Form Submission",
        }
      });
    }

    // Redirect to the educational "Oops" page
    redirect(`/${params.lang}/phishing/oops`);
  }

  return (
    <div className="w-full max-w-md">
      {/* We mimic a generic Microsoft 365 login screen here */}
      <Card className="border-0 shadow-lg sm:rounded-xl overflow-hidden bg-white text-slate-900">
        <div className="p-8 pb-0">
          <div className="flex items-center space-x-2 mb-6 text-xl font-semibold text-slate-800">
            {/* Fake Microsoft Logo Placeholder */}
            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
              <rect x="2" y="2" width="9" height="9" fill="#f25022" />
              <rect x="13" y="2" width="9" height="9" fill="#7fba00" />
              <rect x="2" y="13" width="9" height="9" fill="#00a4ef" />
              <rect x="13" y="13" width="9" height="9" fill="#ffb900" />
            </svg>
            <span>Microsoft</span>
          </div>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Sign in</h2>
          <p className="text-sm text-slate-500 mt-2">to continue to Microsoft 365</p>
        </div>
        <CardContent className="p-8 pt-6">
          <form action={submitCredentials} className="space-y-4">
            <div className="space-y-2">
              <Input 
                id="email" 
                name="email" 
                type="email" 
                placeholder="Email, phone, or Skype" 
                className="rounded-none border-b-2 border-t-0 border-l-0 border-r-0 border-slate-300 px-0 shadow-none focus-visible:ring-0 focus-visible:border-blue-500 text-base"
                required 
              />
            </div>
            <div className="space-y-2 pt-2">
              <Input 
                id="password" 
                name="password" 
                type="password" 
                placeholder="Password" 
                className="rounded-none border-b-2 border-t-0 border-l-0 border-r-0 border-slate-300 px-0 shadow-none focus-visible:ring-0 focus-visible:border-blue-500 text-base"
                required 
              />
            </div>
            <div className="text-sm text-blue-600 hover:underline cursor-pointer mt-4">
              Can't access your account?
            </div>
            <div className="flex justify-end pt-4">
              <Button type="submit" className="bg-[#0067b8] hover:bg-[#005da6] rounded-none px-8 font-normal text-white">
                Next
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
