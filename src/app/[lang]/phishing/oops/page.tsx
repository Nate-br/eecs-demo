import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldAlert, CheckCircle } from "lucide-react";
import Link from "next/link";

export default async function PhishingOopsPage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;

  return (
    <div className="w-full max-w-2xl p-4">
      <Card className="border-0 shadow-2xl rounded-2xl overflow-hidden bg-white text-slate-900 border-t-8 border-t-destructive">
        <CardHeader className="text-center pb-2 pt-10">
          <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
            <ShieldAlert className="w-8 h-8 text-destructive" />
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight text-slate-900">
            Oops! That was a simulated phishing attack.
          </CardTitle>
          <CardDescription className="text-lg text-slate-600 mt-4 max-w-xl mx-auto">
            You just submitted your credentials to a simulated phishing page operated by your IT security team. Don't worry, <strong>your password was not saved or recorded</strong>. 
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8 pt-6">
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 mb-8">
            <h3 className="font-semibold text-slate-900 mb-4 text-lg">How to spot this in the future:</h3>
            <ul className="space-y-4 text-slate-700">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 shrink-0 mt-0.5" />
                <span><strong>Check the URL:</strong> Always verify that the domain exactly matches the expected service (e.g., login.microsoftonline.com). The page you just visited was not a real Microsoft domain.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 shrink-0 mt-0.5" />
                <span><strong>Sense of Urgency:</strong> Phishing emails often create artificial panic (e.g., "Your password expires in 2 hours!"). Pause and verify before acting.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 shrink-0 mt-0.5" />
                <span><strong>Unexpected Prompts:</strong> If you weren't expecting to log in, don't click the link. Go directly to the service's website through your bookmarks.</span>
              </li>
            </ul>
          </div>

          <div className="flex justify-center">
            <Link href={`/${params.lang}/employee/dashboard`}>
              <Button className="bg-slate-900 hover:bg-slate-800 text-white px-8 h-12 rounded-full text-base font-medium">
                Return to Security Dashboard
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
